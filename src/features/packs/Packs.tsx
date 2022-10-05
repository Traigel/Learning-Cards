import React, {useEffect} from 'react';
import styles from './Packs.module.css';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";

import {addNewPackTC, setPacksTC, setPageUlr} from './packs-reducer';

import {Pack} from "./pack/Pack";
import SuperButton from "../../common/components/superButton/SuperButton";
import SuperInputText from "../../common/components/superInputText/SuperInputText";

import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {PacksPagination} from "./packsPagination/PacksPagination";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

export const Packs = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const pageURL = searchParams.get('page')
    const pageCountURL = searchParams.get('pageCount')

    useEffect(() => {
        pageURL && dispatch(setPageUlr(+pageURL))
    }, [])

    const packsInfo = useAppSelector((state) => state.packs.cardPacks)
    console.log('render PACKS')
    //console.log(pageURL, pageCountURL)

    const page = useAppSelector((state) => state.packs.page)
    const pageCount = useAppSelector((state) => state.packs.pageCount)

    useEffect(() => {
        navigate({
            search: createSearchParams({
                page: page + '',
                pageCount: pageCount + '',
            }).toString()
        });
        dispatch(setPacksTC(page, pageCount))
    }, [page, pageCount])

    const dispatch = useAppDispatch()

    const onclickHandler = () => {
        const createPacksData = {name: 'Typescript Pack'}
        dispatch(addNewPackTC(createPacksData))
    }

    return (
        <>
            <div className={styles.button}>
                <SuperButton onClick={onclickHandler}>Add new Pack</SuperButton>
            </div>
            <label>Search</label>
            <div className={styles.input}>
                <SuperInputText placeholder={'Provide your text'}/>
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table sx={{minWidth: 650}} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold', width: 50}}>Name</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 50}} align="right">Cards</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Last Updated</TableCell>
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
                <PacksPagination/>
            </TableContainer>
        </>
    )
}