import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./SetPacks.module.css";
import SuperInputText from "../../../common/components/superInputText/SuperInputText";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {SuperDoubleRange} from "../../../common/components/superDoubleRange/SuperDoubleRange";
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {useDebounce} from '../../../common/hooks/useDebounce';
import {setUrlParamsAC} from "../packs-reducer";

type SetPacksPropsType = {
    onClickButtonMy: () => void
    onClickButtonAll: () => void
    onChangeCommittedRange: (min: string, max: string) => void
    setResetFilter: () => void
    valueSearch: string
    searchValueText: (valueSearch: string) => void
    minRangeURL: string
    maxRangeURL: string
}

export const SetPacks = ({
                             onClickButtonMy,
                             onClickButtonAll,
                             onChangeCommittedRange,
                             setResetFilter,
                             searchValueText,
                             valueSearch,
                             minRangeURL,
                             maxRangeURL
                         }: SetPacksPropsType) => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const myUserID = useAppSelector(state => state.auth.profile?._id)
    const filterUserID = useAppSelector(state => state.packs.params.userID)

    const [minRange, setMinRange] = useState<number>(minCardsCount)
    const [maxRange, setMaxRange] = useState<number>(maxCardsCount)

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        searchValueText(e.currentTarget.value)
    }

    const onChangeRangeHandler = (value: [number, number]) => {
        setMinRange(value[0])
        setMaxRange(value[1])
    }

    const onChangeCommittedHandler = (value: [number, number]) => {
        onChangeCommittedRange(value[0] + '', value[1] + '')
    }

    const onFunnelClickHandler = () => {
        setResetFilter()
    }

    useEffect(() => {
        setMinRange(minRangeURL ? +minRangeURL : minCardsCount)
        setMaxRange(maxRangeURL ? +maxRangeURL : maxCardsCount)
    }, [minCardsCount, maxCardsCount])

    const myNotActive = myUserID === filterUserID ? styles.active : styles.notActive
    const allNotActive = myUserID !== filterUserID ? styles.active : styles.notActive

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
                    onClick={onClickButtonMy}
                    disabled={myUserID === filterUserID}
                >My</SuperButton>
                <SuperButton
                    className={`${styles.button} ${allNotActive}`}
                    onClick={onClickButtonAll}
                    disabled={myUserID !== filterUserID}
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