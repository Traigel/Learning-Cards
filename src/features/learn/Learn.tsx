import React, {useEffect, useState} from 'react';
import styles from './Learn.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {useNavigate, useParams} from 'react-router-dom';
import {createLearnCardsTC, setCardsLearnTC} from "../cards/cards-reducer";
import {SvgSelector} from "../../common/components/svgSelector/svgSelector";
import {getCard} from "../../common/utils/getCard";
import {CardsType} from "../../api/api";
import SuperButton from '../../common/components/superButton/SuperButton';

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

export const Learn = () => {

    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.cards)

    const [visibility, setVisibility] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true);
    const [valueRadio, setValueRadio] = useState<number>(1);

    const [card, setCard] = useState<CardsType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        __v: 0,
        created: '',
        updated: '',
    });

    useEffect(() => {

        if (first) {
            params.packId && dispatch(setCardsLearnTC(params.packId));
            setFirst(false);
        }

        if (cards.cards.length > 0) setCard(getCard(cards.cards));

    }, [cards]);

    const backToCardsBlockHandler = () => {
        navigate(-1)
    }

    const visibilityHandler = () => {
        setVisibility(true)
    }

    const onNextHandler = () => {
        setVisibility(false)
        setFirst(true)
        if (cards.cards.length > 0) {
            dispatch(createLearnCardsTC({card_id: card._id, grade: valueRadio}))
            setCard(getCard(cards.cards));
        }
    }

    return (
        <div>
            <div className={styles.backToCardsBlock}>
                <div
                    onClick={backToCardsBlockHandler}
                    className={styles.goToPacksTitle}
                >
                    <SvgSelector svgName={"arrow"}/>
                    <span className={styles.arrowText}> Back to packs list</span>
                </div>
            </div>
            <div className={styles.learnContainer}>
                <h2 className={styles.title}>
                    Learn "{cards.packName}"
                </h2>
                <div className={styles.learn}>
                    {cards.cards.length > 0 ?
                        <div>
                            <span className={styles.question}>Question: </span>{card.question}
                            <p className={styles.numberShots}>Number of answers per question: {card.shots}</p>
                        </div>
                        :
                        <div className={styles.error}>
                            <span>There are no cards in this package.</span>
                        </div>
                    }
                    {!visibility
                        ?
                        <div>
                            <SuperButton disabled={cards.cards.length === 0} onClick={visibilityHandler}
                                         className={styles.button}>Show answer</SuperButton>
                        </div>
                        :
                        <div>
                            <div>
                                <span className={styles.question}>Answer: </span>{card.answer}
                            </div>
                            <div className={styles.rateBox}>
                                <p>Rate yourself:</p>
                                {grades.map((el, index) => {
                                    const onClickHandler = () => {
                                        setValueRadio(index + 1)
                                    }
                                    return (
                                        <div>
                                            <div
                                                key={index}
                                                className={styles.inputRadio}
                                                onClick={onClickHandler}
                                            >
                                                <input
                                                    type={'radio'}
                                                    checked={valueRadio === index + 1}
                                                />
                                                <span>{el}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <SuperButton onClick={onNextHandler} className={styles.button}>Next</SuperButton>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};