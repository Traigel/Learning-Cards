import React, {useEffect, useState} from 'react';
import styles from './Packs.module.css';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {addNewPackTC, setPacksTC, setUrlParamsAC, UrlParamsType} from './packs-reducer';
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

export const Packs = () => {
    console.log('Packs')
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
        min: '0',
        max: '0'
    })
    const [packName, setPackName] = useState<string>(packNameURL ? packNameURL : '')

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

    const onclickHandler = () => {
        const createPacksData = {name: 'Typescript Pack'}
        dispatch(addNewPackTC(createPacksData))
    }

    const pageHandler = (valuePage: number) => {
        setParamsSearchState({...paramsSearchState, page: valuePage + ''})
        setSearchParams({...filterQueryParams({...paramsSearchState, page: valuePage + ''})})
    }

    const pageCountHandler = (valuePageCount: number) => {
        setParamsSearchState({...paramsSearchState, pageCount: valuePageCount + '', min: '', max: ''})
        setSearchParams({...filterQueryParams({...paramsSearchState, pageCount: valuePageCount + '', min: '', max: ''})})
    }

    const onClickButtonMyHandler = () => {
        myUserID && setParamsSearchState({...paramsSearchState, userID: myUserID, page: '1', pageCount: '5', min: '', max: ''})
        myUserID && setSearchParams({
            ...filterQueryParams({
                ...paramsSearchState,
                userID: myUserID,
                page: '1',
                pageCount: '5', min: '', max: ''
            })
        })
    }

    const onClickButtonAllHandler = () => {
        setParamsSearchState({...paramsSearchState, userID: '', page: '1', pageCount: '5'})
        setSearchParams({...filterQueryParams({...paramsSearchState, userID: '', page: '1', pageCount: '5'})})
    }

    const onChangeCommittedRangeHandler = (min: string, max: string) => {
        setParamsSearchState({...paramsSearchState, min, max})
        setSearchParams({...filterQueryParams({...paramsSearchState, min, max})})
    }

    const setResetFilterHandler = () => {
        setParamsSearchState({page: '1', pageCount: '5', userID: '', min: '', max: ''})
        setSearchParams({page: '1', pageCount: '5'})
    }

    const searchValueTextHandler = (valueSearch: string) => {
        setPackName(valueSearch)
        setSearchParams({...filterQueryParams({...paramsSearchState, packName: valueSearch})})
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <div className={styles.button}>
                <SuperButton onClick={onclickHandler}>Add new Pack</SuperButton>
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
            />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold', width: 50}}>Name</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 50}} align="right">Cards</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Last
                                Updated</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Created By</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks && cardPacks.map((row) => (
                            <Pack
                                key={row._id}
                                userId={row.user_id}
                                packId={row._id}
                                name={row.name}
                                cardsCount={row.cardsCount}
                                updated={row.updated}
                                user_name={row.user_name}
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