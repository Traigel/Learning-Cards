import React from "react";
import {SvgSelector} from "../svgSelector/svgSelector";
import styles from './StarRating.module.css'

type RatingTypeProps = {
    ratingValue: number
}

export const StarRating = ({ratingValue}: RatingTypeProps) => {

    return <div className={styles.stars}>
        <div className={styles.star}><Star oneActive={ratingValue >= 0.5} twoActive={ratingValue >= 1}/></div>
        <div className={styles.star}><Star oneActive={ratingValue >= 1.5} twoActive={ratingValue >= 2}/></div>
        <div className={styles.star}><Star oneActive={ratingValue >= 2.5} twoActive={ratingValue >= 3}/></div>
        <div className={styles.star}><Star oneActive={ratingValue >= 3.5} twoActive={ratingValue >= 4}/></div>
        <div className={styles.star}><Star oneActive={ratingValue >= 4.5} twoActive={ratingValue >= 5}/></div>
    </div>
}

type StarPropsType = {
    oneActive: boolean
    twoActive: boolean
};

const Star = ({oneActive, twoActive}: StarPropsType) => {
    if (oneActive) {
        if (twoActive) {
            return <SvgSelector svgName={"starActive"}/>
        } else {
            return <SvgSelector svgName={"starSemiActive"}/>
        }
    } else {
        return <SvgSelector svgName={"starNotActive"}/>
    }
};