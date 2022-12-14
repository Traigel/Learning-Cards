import React, {useEffect, useState} from 'react';
import styles from './Packs.module.css';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {setPacksTC, setUrlParamsAC, UrlParamsType} from './packs-reducer';
import {Pack} from "./pack/Pack";
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SuperButton from "../../common/components/superButton/SuperButton";
import {SetPacks} from './setPacks/SetPacks';
import {PacksPagination} from "./packsPagination/PacksPagination";
import {Navigate, useSearchParams} from "react-router-dom";
import {filterQueryParams} from "../../common/utils/query-params";
import {useDebounce} from "../../common/hooks/useDebounce";
import {AddNewPackModal} from "../../common/components/modals/packs/AddNewPackModal";
import {BasicModal} from "../../common/components/modals/basicModal/BasicModal";

export const Packs = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const cardPacks = useAppSelector(state => state.packs.cardPacks)

    const myUserID = useAppSelector(state => state.auth.profile?._id)

    const [searchParams, setSearchParams] = useSearchParams()

    const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
    const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
    const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
    const userIDURL = searchParams.get('userID') ? searchParams.get('userID') + '' : ''
    const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
    const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''

    const [paramsSearchState, setParamsSearchState] = useState<UrlParamsType>({
        page: '1',
        pageCount: '5',
        userID: '',
        min: '',
        max: ''
    })
    const [packName, setPackName] = useState<string>(packNameURL ? packNameURL : '')
    const [openAddNewPackModal, setOpenAddNewPackModal] = useState(false);

    const debouncedValue = useDebounce<string>(packName, 500)

    const urlParamsFilter = filterQueryParams({
        page: pageURL,
        pageCount: pageCountURL,
        packName: packNameURL,
        userID: userIDURL,
        min: minRangeURL,
        max: maxRangeURL
    })

    useEffect(() => {
            dispatch(setUrlParamsAC({...urlParamsFilter}))
            dispatch(setPacksTC())
        }, [paramsSearchState, debouncedValue]
    )

    const onclickAddPackHandler = () => {
        setOpenAddNewPackModal(true)
    }

    const pageHandler = (valuePage: number) => {
        setParamsSearchState({...paramsSearchState, page: valuePage + ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                page: valuePage + '',
                userID: userIDURL,
                packName
            })
        })
    }

    const pageCountHandler = (valuePageCount: number) => {
        setParamsSearchState({...paramsSearchState, pageCount: valuePageCount + '', min: '', max: ''})
        setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                pageCount: valuePageCount + '',
                min: '',
                max: '',
                userID: userIDURL,
                packName
            })
        })
    }

    const onClickButtonMyHandler = () => {
        myUserID && setParamsSearchState({
            ...paramsSearchState,
            userID: myUserID,
            page: '1',
            pageCount: '5',
            min: '',
            max: ''
        })
        myUserID && setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                userID: myUserID,
                page: '1',
                pageCount: '5',
                min: '',
                max: '',
                packName
            })
        })
    }

    const onClickButtonAllHandler = () => {
        setParamsSearchState({...paramsSearchState, userID: '', page: '1', pageCount: '5'})
        setSearchParams({...filterQueryParams({...paramsSearchState, userID: '', page: '1', pageCount: '5', packName})})
    }

    const onChangeCommittedRangeHandler = (min: string, max: string) => {
        setParamsSearchState({...paramsSearchState, min, max, userID: userIDURL})
        setSearchParams({...filterQueryParams({...paramsSearchState, min, max, userID: userIDURL, packName})})
    }

    const setResetFilterHandler = () => {
        setParamsSearchState({page: '1', pageCount: '5', userID: '', min: '', max: ''})
        setSearchParams({page: '1', pageCount: '5'})
        setPackName('')
    }

    const searchValueTextHandler = (valueSearch: string) => {
        setPackName(valueSearch)
        setSearchParams({...filterQueryParams({...paramsSearchState, packName: valueSearch, userID: userIDURL})})
    }

    const handleAddNewPackModalClose = () => setOpenAddNewPackModal(false);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <BasicModal open={openAddNewPackModal} handleClose={handleAddNewPackModalClose}>
                <AddNewPackModal handleClose={handleAddNewPackModalClose}/>
            </BasicModal>
            <div className={styles.packsHeader}>
                <h2>Packs list</h2>
                <div>
                    <SuperButton
                        onClick={onclickAddPackHandler}
                        className={styles.button}
                    >Add new pack</SuperButton>
                </div>
            </div>
            <SetPacks
                onClickButtonMy={onClickButtonMyHandler}
                onClickButtonAll={onClickButtonAllHandler}
                onChangeCommittedRange={onChangeCommittedRangeHandler}
                setResetFilter={setResetFilterHandler}
                valueSearch={packName}
                searchValueText={searchValueTextHandler}
                minRangeURL={minRangeURL}
                maxRangeURL={maxRangeURL}
                urlUserID={userIDURL}
            />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.headerRow}>Name</TableCell>
                            <TableCell className={styles.headerRow}>Cards</TableCell>
                            <TableCell className={styles.headerRow}>Last Updated</TableCell>
                            <TableCell className={styles.headerRow}>Created By</TableCell>
                            <TableCell className={styles.headerRow}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks && cardPacks.map((el) => (
                            <Pack
                                key={el._id}
                                cardPack={el}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PacksPagination
                callBackPage={pageHandler}
                callBackPageCount={pageCountHandler}
            />
        </>
    )
}