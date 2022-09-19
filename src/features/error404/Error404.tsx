import React, {useState} from 'react';
import styles from './Error404.module.css'
import error404 from '../../assets/image/error404.gif';
import {Navigate} from "react-router-dom";

export const Error404 = () => {

    const [error, setError] = useState<boolean>(false)
    const onClickHandler = () => setError(true)

    if (error) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.error404}>
            <img onClick={onClickHandler} alt={'qwe'} src={error404}/>
        </div>
    )
}