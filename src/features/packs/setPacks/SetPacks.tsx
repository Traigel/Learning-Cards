import React, {useEffect, useState} from 'react';
import styles from "./SetPacks.module.css";
import SuperInputText from "../../../common/components/superInputText/SuperInputText";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {SuperDoubleRange} from "../../../common/components/superDoubleRange/SuperDoubleRange";
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";
import {useAppSelector} from "../../../common/hooks/hooks";

export const SetPacks = () => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const filterPacks = useAppSelector(state => state.packs.filterPacks)
    console.log(minCardsCount, maxCardsCount)

    const [minRange, setMinRange] = useState(minCardsCount)
    const [maxRange, setMaxRange] = useState(maxCardsCount)

    const onChangeRangeHandler = (value: [number, number]) => {
        setMinRange(value[0])
        setMaxRange(value[1])
    }

    useEffect(()=> {
        setMinRange(minCardsCount)
        setMaxRange(maxCardsCount)
    }, [minCardsCount, maxCardsCount])

    const myActive = filterPacks === 'My' ? styles.active : ''
    const allActive = filterPacks === 'All' ? styles.active : ''

     return (
        <div className={styles.setPacks}>
            <div className={styles.inputBlock}>
                <label>Search</label>
                <SuperInputText
                    placeholder={'Provide your text'}
                    className={styles.input}
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
                    value={[minRange , maxRange]}
                    onChangeRange={onChangeRangeHandler}
                    minMax={[minCardsCount, maxCardsCount]}
                    className={styles.doubleRange}
                />
                <div className={styles.number}>{maxRange}</div>
            </div>
            <div>
                <SvgSelector svgName={"funnel"}/>
            </div>
        </div>
    )
}