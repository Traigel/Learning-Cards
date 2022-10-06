import React, {useEffect} from 'react';
import styles from './Packs.module.css';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {addNewPackTC, setPacksTC} from './packs-reducer';
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
import {createSearchParams, Navigate, useNavigate, useSearchParams} from "react-router-dom";

export const Packs = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const pageURL = searchParams.get('page')
    const pageCountURL = searchParams.get('pageCount')
    const packNameURL = searchParams.get('packName')
    const userIDURL = searchParams.get('userID')
    const minRangeURL = searchParams.get('min')
    const maxRangeURL = searchParams.get('max')

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const packsInfo = useAppSelector(state => state.packs.cardPacks)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const packName = useAppSelector(state => state.packs.packName)
    const userID = useAppSelector(state => state.packs.userID)
    const minRange = useAppSelector(state => state.packs.minRange)
    const maxRange = useAppSelector(state => state.packs.maxRange)

    const finalPageURL = pageURL ? +pageURL : page
    const finalPageCountURL = pageCountURL ? +pageCountURL : pageCount
    const finalPackNameURL = packNameURL !== null ? packNameURL : packName
    const finalUserID = userIDURL !== null ? userIDURL : userID
    const finalMinRangeURL = minRangeURL !== null ? +minRangeURL : minRange
    const finalMaxRangeURL = maxRangeURL !== null ? +maxRangeURL : maxRange

    useEffect(() => {
        dispatch(setPacksTC({
            page: finalPageURL,
            pageCount: finalPageCountURL,
            packName: finalPackNameURL,
            userID: finalUserID,
            minRange: finalMinRangeURL,
            maxRange: finalMaxRangeURL
        }))
    }, [finalPackNameURL, finalMinRangeURL, finalMaxRangeURL, finalUserID])

    useEffect(() => {
            setSearchParams({
                page: page + '',
                pageCount: pageCount + '',
                packName,
                userID,
                min: minRange + '',
                max: maxRange + ''
            })
            // if (packName) {
            //     setSearchParams({page: page + '', pageCount: pageCount + '', packName})
            // } else {
            //     setSearchParams({page: page + '', pageCount: pageCount + ''})
            // }

        },
        [page, pageCount, packName, userID, minRange, maxRange]
    )

    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (packName) {
    //         navigate({
    //             search: createSearchParams({
    //                 page: page + '',
    //                 pageCount: pageCount + '',
    //                 packName: packName,
    //             }).toString()
    //         });
    //     } else {
    //         navigate({
    //             search: createSearchParams({
    //                 page: page + '',
    //                 pageCount: pageCount + ''
    //             }).toString()
    //         });
    //     }
    // }, [page, pageCount, packName])

    const onclickHandler = () => {
        const createPacksData = {name: 'Typescript Pack'}
        dispatch(addNewPackTC(createPacksData))
    }

    const pageHandler = (valuePage: number) => {
        dispatch(setPacksTC({page: valuePage, pageCount, packName, userID, minRange, maxRange}))
    }

    const pageCountHandler = (valuePageCount: number) => {
        dispatch(setPacksTC({page, pageCount: valuePageCount, packName, userID, minRange, maxRange}))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <div className={styles.button}>
                <SuperButton onClick={onclickHandler}>Add new Pack</SuperButton>
            </div>
            <SetPacks/>
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
                        {packsInfo && packsInfo.map((row) => (
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
                <PacksPagination
                    callBackPage={pageHandler}
                    callBackPageCount={pageCountHandler}
                />
            </TableContainer>
        </>
    )
}