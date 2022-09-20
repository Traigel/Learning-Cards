import React, {FocusEvent, KeyboardEvent, useEffect, useState} from 'react'
import styles from './Profile.module.css'
import SuperButton from "../../common/components/superButton/SuperButton";
import SuperEditableSpan from "../../common/components/superEditableSpan/SuperEditableSpan";
import {changeUserNameTC, logoutTC} from "../login/auth-reducer";
import {useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn, getProfileInfo} from "../login/auth-selectors";

export const Profile = () => {

    const profileInfo = useSelector(getProfileInfo)
    const isLoggedIn = useSelector(getIsLoggedIn)

    const [inputValue, setInputValue] = useState<string>('')
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const changeUserNameHandler = (e: string) => {
        setInputValue(e)
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        dispatch(changeUserNameTC({name: e.currentTarget.value, avatar: ''}))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(changeUserNameTC({name: e.currentTarget.value, avatar: ''}))
        }
    }

    useEffect(()=> {
        if (profileInfo) {
            setInputValue(profileInfo.name)
        }
    }, [profileInfo])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileBlock}>
                <h2 className={styles.profileMainTitle}>Personal Information</h2>
                <div>
                    <img className={styles.userAvatar}
                         src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                         alt='user-ava'/>
                    <span>1</span>
                </div>
                <SuperEditableSpan
                    value={inputValue}
                    className={styles.additionalForInput}
                    spanClassName={styles.additionalForSpan}
                    onChangeText={(e) => changeUserNameHandler(e)}
                    onBlur={(e) => onBlurHandler(e)}
                    onKeyPress={(e) => onKeyPressHandler(e)}
                />
                <h3>{profileInfo!.email}</h3>
                <SuperButton onClick={logoutHandler}>
                    Log out
                </SuperButton>
            </div>
        </div>
    )
}