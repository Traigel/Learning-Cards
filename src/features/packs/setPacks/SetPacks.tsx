import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./SetPacks.module.css";
import SuperInputText from "../../../common/components/superInputText/SuperInputText";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {SuperDoubleRange} from "../../../common/components/superDoubleRange/SuperDoubleRange";
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {useDebounce} from '../../../common/hooks/useDebounce';
import {setMinMaxAC, setPackNameSearchAC} from "../packs-reducer";

export const SetPacks = () => {

    const dispatch = useAppDispatch()
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const [valueSearch, setValueSearch] = useState<string>('')
    const debouncedValue = useDebounce<string>(valueSearch, 500)

    const [minRange, setMinRange] = useState<number>(minCardsCount)
    const [maxRange, setMaxRange] = useState<number>(maxCardsCount)

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.currentTarget.value)
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

    useEffect(() => {
        setMinRange(minCardsCount)
        setMaxRange(maxCardsCount)
    }, [minCardsCount, maxCardsCount])

    const myActive = styles.active
    const allActive = 'styles.active'

    return (
        <div className={styles.setPacks}>
            <div className={styles.inputBlock}>
                <label>Search</label>
                <SuperInputText
                    placeholder={'Provide your text'}
                    className={styles.input}
                    value={valueSearch}
                    onChange={searchHandler}
                />
            </div>
            <div className={styles.buttonFilterBlock}>
                <label>Show packs cards</label>
                <SuperButton
                    className={`${styles.button} ${myActive}`}

                >My</SuperButton>
                <SuperButton
                    className={`${styles.button} ${allActive}`}

                >All</SuperButton>
            </div>
            <div className={styles.doubleRangeBlock}>
                <label>Number of cards</label>
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
                <SvgSelector svgName={"funnel"}/>
            </div>
        </div>
    )
}