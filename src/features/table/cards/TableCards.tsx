import * as React from 'react';
import {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SuperButton from '../../../common/components/superButton/SuperButton';
import styles from './TableCards.module.css'
import SuperInputText from '../../../common/components/superInputText/SuperInputText';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {createCardsTC, setCardsTC} from './cards-reducer';
import {useParams} from 'react-router-dom';
import {Card} from './Card';

export const TableCards = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const params = useParams()
    const packID = params.packID

    useEffect(() => {
        if (packID) {
            dispatch(setCardsTC(packID))
        }
    }, [])

    const learnCards = ()=> {
        alert('EXY')
    }

    const addNewCardHandler = () => {
        const newCard = {
            cardsPack_id: packID,
            answer: 'what are you doing?',
            question: 'oops..'
        }
        dispatch(createCardsTC(newCard))
    }
    const userID = useAppSelector((state)=>state.auth.profile?._id)
    const userCardID = useAppSelector(state => state.cards.packUserID)
    const packName = useAppSelector(state => state.cards.packName)
    const isPackAuthor = userCardID === userID

    return (
        <>
            <h2>
                {packName}
            </h2>
            {isPackAuthor ?
            <div className={styles.button}>
                <SuperButton onClick={addNewCardHandler}>Add new card</SuperButton>
            </div> : <div className={styles.button}>
                    <SuperButton onClick={learnCards}>Learn to pack</SuperButton>
                </div>}
            <label>Search</label>
            <div className={styles.input}>
                <SuperInputText placeholder={'Provide your text'}/>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold', width: 50}}>Question</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 50}} align="right">Answer</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Last Updated</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards && cards.map((row) => (
                            <Card
                                cardID={row._id}
                                userID={row.user_id}
                                key={row._id}
                                question={row.question}
                                answer={row.answer}
                                grade={row.grade}
                                updated={row.updated}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
