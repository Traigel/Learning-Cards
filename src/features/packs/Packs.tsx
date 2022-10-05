import React from 'react';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {addNewPackTC, setPacksTC} from './packs-reducer';
import {Pack} from "./pack/Pack";
import styles from './Packs.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SuperButton from "../../common/components/superButton/SuperButton";
import { SetPacks } from './setPacks/SetPacks';

export const Packs = () => {

    const packsInfo = useAppSelector((state)=> state.packs.cardPacks)

    const dispatch = useAppDispatch()

    const onclickHandler = () => {
        const createPacksData = {name: 'Typescript Pack'}
        dispatch(addNewPackTC(createPacksData))
    }

    useEffect(() => {
        dispatch(setPacksTC())
    }, [])

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
            </TableContainer>
        </>
    )
}