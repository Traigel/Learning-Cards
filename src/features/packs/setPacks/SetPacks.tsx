import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./SetPacks.module.css";
import SuperInputText from "../../../common/components/superInputText/SuperInputText";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {SuperDoubleRange} from "../../../common/components/superDoubleRange/SuperDoubleRange";
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {useDebounce} from '../../../common/hooks/useDebounce';
import {setMinMaxAC, setPackNameSearchAC, setPacksTC, setResetFilterTC, setUserIDAC} from "../packs-reducer";

export const SetPacks = () => {

    const dispatch = useAppDispatch()
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const [valueSearch, setValueSearch] = useState<string>('')
    const debouncedValue = useDebounce<string>(valueSearch, 500)

    const myUserID = useAppSelector(state => state.auth.profile?._id)
    const UserID = useAppSelector(state => state.packs.userID)

    const [minRange, setMinRange] = useState<number>(minCardsCount)
    const [maxRange, setMaxRange] = useState<number>(maxCardsCount)

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.currentTarget.value)
    }

    const onClickButtonMyHandler = () => {
        myUserID && dispatch(setUserIDAC(myUserID))
    }

    const onClickButtonAllHandler = () => {
        dispatch(setUserIDAC(''))
    }

    useEffect(() => {
        dispatch(setPackNameSearchAC(valueSearch))
    }, [debouncedValue])

    const onChangeRangeHandler = (value: [number, number]) => {
        setMinRange(value[0])
        setMaxRange(value[1])
    }

    const onChangeCommittedHandler = (value: [number, number]) => {
        dispatch(setMinMaxAC(value[0], value[1]))
    }

    const onFunnelClickHandler = () => {
        dispatch(setResetFilterTC(1, 5))
    }

    useEffect(() => {
        setMinRange(minCardsCount)
        setMaxRange(maxCardsCount)
    }, [minCardsCount, maxCardsCount])

    const myNotActive = myUserID === UserID ? styles.active : styles.notActive
    const allNotActive = myUserID !== UserID ? styles.active : styles.notActive

    return (
        <div className={styles.setPacks}>
            <div className={styles.inputBlock}>
                <label className={styles.title}>Search</label>
                <SuperInputText
                    placeholder={'Provide your text'}
                    className={styles.input}
                    value={valueSearch}
                    onChange={searchHandler}
                />
            </div>
            <div className={styles.buttonFilterBlock}>
                <label className={styles.title}>Show packs cards</label>
                <SuperButton
                    className={`${styles.button} ${myNotActive}`}
                    onClick={onClickButtonMyHandler}
                    disabled={myUserID === UserID}
                >My</SuperButton>
                <SuperButton
                    className={`${styles.button} ${allNotActive}`}
                    onClick={onClickButtonAllHandler}
                    disabled={myUserID !== UserID}
                >All</SuperButton>
            </div>
            <div className={styles.doubleRangeBlock}>
                <label className={styles.title}>Number of cards</label>
                <div className={styles.number}>{minRange}</div>
                <SuperDoubleRange
                    value={[minRange, maxRange]}
                    onChangeRange={onChangeRangeHandler}
                    minMax={[minCardsCount, maxCardsCount]}
                    className={styles.doubleRange}
                    onChangeCommitted={onChangeCommittedHandler}
                />
                <div className={styles.number}>{maxRange}</div>
            </div>
            <div>
                <SuperButton onClick={onFunnelClickHandler} className={styles.iconBtn}>
                    <SvgSelector svgName='funnel'/>
                </SuperButton>
            </div>
        </div>
    )
}