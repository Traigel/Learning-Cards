import React from 'react'
import style from './EyeOnOff.module.css'
import eyeOn from '../../../assets/image/eyeOn.png';
import eyeOff from '../../../assets/image/eyeOff.png';

export const EyeOnOff = (props: EyeOnOffPropsType) => {
    return (
        <div
            className={`${style.eyeBlock}  ${props.className && props.className}`}
            onClick={props.onClick}
        >
            {
                !props.onOff
                    ? <img className={style.eye} src={eyeOn} alt={'eyeOn'}/>
                    : <img className={style.eye} src={eyeOff} alt={'eyeOff'}/>
            }
        </div>
    )
}

//type
type EyeOnOffPropsType = {
    onOff: boolean
    onClick: () => void
    className?: string
}