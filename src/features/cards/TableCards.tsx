import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './TableCards.module.css'
import {setCardsTC, setUrlCardsParamsAC, UrlCardsParamsType} from './cards-reducer';
import {Navigate, NavLink, useSearchParams} from 'react-router-dom';
import {Card} from './card/Card';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {AddModal} from '../../common/components/modals/cards/AddModal';
import SuperButton from '../../common/components/superButton/SuperButton';
import SuperInputText from "../../common/components/superInputText/SuperInputText";
import {CardsPagination} from "./cardsPagination/CardsPagination";
import {useDebounce} from "../../common/hooks/useDebounce";
import {filterQueryParams} from "../../common/utils/query-params";
import {SvgSelector} from "../../common/components/svgSelector/svgSelector";

export const TableCards = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const cards = useAppSelector(state => state.cards.cards)

    const [searchParams, setSearchParams] = useSearchParams()
    const cardsPack_idURL = searchParams.get('cardsPack_id') ? searchParams.get('cardsPack_id') + '' : '1'
    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const cardQuestionURL = searchParams.get('cardQuestion') ? searchParams.get('cardQuestion') + '' : ''

    const userID = useAppSelector((state) => state.auth.profile?._id)
    const userCardID = useAppSelector(state => state.cards.packUserId)
    const packName = useAppSelector(state => state.cards.packName)

    const [visibilityValue, setVisibilityValue] = useState<boolean>(false)
    const [paramsSearchState, setParamsSearchState] = useState<UrlCardsParamsType>({
        page: '1',
        pageCount: '5',
        cardsPack_id: cardsPack_idURL
    })
    const [cardQuestion, setCardQuestion] = useState<string>(cardQuestionURL ? cardQuestionURL : '')

    const debouncedValue = useDebounce<string>(cardQuestion, 500)

    const urlParamsFilter = filterQueryParams({
        cardsPack_id: cardsPack_idURL,
        page: pageURL,
        pageCount: pageCountURL,
        cardQuestion: cardQuestionURL,
    })

    useEffect(() => {
        dispatch(setUrlCardsParamsAC({...urlParamsFilter}))
        dispatch(setCardsTC())
    }, [paramsSearchState, debouncedValue])

    useEffect(() => {
        return setVisibilityValue(false)
    }, [])

    const learnCards = () => {
        alert('EXY')
    }

    const searchValueTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCardQuestion(e.currentTarget.value)
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                cardQuestion: e.currentTarget.value
            })
        })
    }

    const pageHandler = (valuePage: number) => {
        setParamsSearchState({...paramsSearchState, page: valuePage + ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                page: valuePage + '',
                cardQuestion
            })
        })
    }

    const pageCountHandler = (valuePageCount: number) => {
        setParamsSearchState({...paramsSearchState, pageCount: valuePageCount + ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                pageCount: valuePageCount + '',
                cardQuestion
            })
        })
    }

    const onClickMenuHandler = () => {
        setVisibilityValue(!visibilityValue)
    }

    const isPackAuthor = userCardID === userID

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <div className={styles.backToCardsBlock}>
                <NavLink
                    to={`/packs?page=1&pageCount=5`}
                    className={styles.goToPacksTitle}
                >
                    <SvgSelector svgName={"arrow"}/>
                    <span className={styles.arrowText}> Back to packs list</span>
                </NavLink>
            </div>
            <div className={styles.infoBox}>
                <div className={styles.titleMenu}>
                    <h2 className={styles.title}>
                        {packName}
                        {isPackAuthor ?
                            <div
                                onClick={onClickMenuHandler}
                                className={styles.iconMenu}>
                                <SvgSelector svgName={"menu"}/>
                            </div>
                            : <div></div>
                        }
                    </h2>
                    {visibilityValue &&
                        <div className={styles.cardsMenu}>
                            <div className={styles.pointer}></div>
                            <div className={styles.menu}>
                                <div className={styles.menuEl}>
                                    <SvgSelector svgName={"pencil"}/>
                                    <span className={styles.elTitle}>Edit</span>
                                </div>
                                <div className={styles.menuEl}>
                                    <SvgSelector svgName={"delete"}/>
                                    <span className={styles.elTitle}>Delete</span>
                                </div>
                                <div className={styles.menuEl}>
                                    <SvgSelector svgName={"cap"}/>
                                    <span className={styles.elTitle}>Learn</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {isPackAuthor
                        ?
                        <AddModal id={cardsPack_idURL}/>
                        :
                        <SuperButton onClick={learnCards}>Learn to pack</SuperButton>
                    }
                </div>
            </div>
            <div className={styles.inputBlock}>
                <label className={styles.label}>Search</label>
                <SuperInputText
                    placeholder={'Provide your text'}
                    className={styles.input}
                    value={cardQuestion}
                    onChange={searchValueTextHandler}
                />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.headerRow}>Question</TableCell>
                            <TableCell className={styles.headerRow}>Answer</TableCell>
                            <TableCell className={styles.headerRow}>Last Updated</TableCell>
                            <TableCell className={styles.headerRow}>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards && cards.map((el) => (
                            <Card
                                key={el._id}
                                card={el}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CardsPagination
                callBackPage={pageHandler}
                callBackPageCount={pageCountHandler}
            />
        </>
    );
}
