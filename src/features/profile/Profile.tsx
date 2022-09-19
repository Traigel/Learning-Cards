import React, {useState} from 'react'
import styles from './Profile.module.css'
import SuperButton from "../../common/components/superButton/SuperButton";
import SuperEditableSpan from "../../common/components/superEditableSpan/SuperEditableSpan";
import {logoutTC} from "../login/auth-reducer";
import {useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn, getProfileInfo} from "../login/auth-selectors";

export const Profile = () => {

    const profileInfo = useSelector(getProfileInfo)
    const isLoggedIn = useSelector(getIsLoggedIn)

    const [inputValue, setInputValue] = useState<string>('')

    const dispatch = useAppDispatch()

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const changeUserNameHandler = () => {
        // dispatch(changeUserNameTC(data))
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileBlock}>
                <h2 className={styles.profileMainTitle}>Personal Information</h2>
                <div>
                    <img className={styles.userAvatar} src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' alt='user-ava'/>
                    <span>1</span>
                </div>
                <SuperEditableSpan
                    value={inputValue}
                    className={styles.additionalForInput}
                    spanClassName={styles.additionalForSpan}
                    onChangeText={changeUserNameHandler}
                />
                <h3>test-mail@gmail.com</h3>
                <SuperButton onClick={logoutHandler}>
                    Log out
                </SuperButton>
            </div>
        </div>
    )
}