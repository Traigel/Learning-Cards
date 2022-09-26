import React from 'react';
import styles from "./SetPacks.module.css";
import SuperInputText from "../../../common/components/superInputText/SuperInputText";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {SuperDoubleRange} from "../../../common/components/superDoubleRange/SuperDoubleRange";
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";
import {useAppSelector} from "../../../common/hooks/hooks";

export const SetPacks = () => {

    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    return (
        <div className={styles.setPacks}>
            <div className={styles.inputBlock}>
                <label>Search</label>
                <SuperInputText placeholder={'Provide your text'}/>
            </div>
            <div className={styles.buttonFilter}>
                <label>Show packs cards</label>
                <SuperButton>My</SuperButton>
                <SuperButton>All</SuperButton>
            </div>
            <div className={styles.doubleRangeBlock}>
                <label>Number of cards</label>
                <SuperDoubleRange
                    value={[minCardsCount , maxCardsCount]}
                    onChangeRange={() => {
                    }}
                    className={styles.doubleRange}
                />
            </div>
            <div>
                <SvgSelector svgName={"funnel"}/>
            </div>
        </div>
    )
}