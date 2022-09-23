import React, {FocusEvent, KeyboardEvent, useEffect, useState} from 'react'
import styles from './Profile.module.css'
import SuperButton from "../../common/components/superButton/SuperButton";
import SuperEditableSpan from "../../common/components/superEditableSpan/SuperEditableSpan";
import {logoutTC, updateUserInfoTC} from "../login/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn, getProfileInfo} from "../login/auth-selectors";

export const Profile = () => {

    const profileInfo = useSelector(getProfileInfo)
    const isLoggedIn = useSelector(getIsLoggedIn)
    const userName = useAppSelector((state) => state.auth.profile?.name)

    const [inputValue, setInputValue] = useState(userName)
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const changeUserNameHandler = (e: string) => {
        setInputValue(e)
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        dispatch(updateUserInfoTC({name: e.currentTarget.value, avatar: ''}))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(updateUserInfoTC({name: e.currentTarget.value, avatar: ''}))
        }
    }

    useEffect(() => {
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
                <div className={styles.userAvatarContainer}>
                    <img className={styles.userAvatar}
                         src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                         alt='user-avatar'/>
                    <span className={styles.changeAvatarIcon}><svg width="30px" height="30px" viewBox="0 0 52 52"><g><path d="M26,20c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S30.4,20,26,20z"/><path d="M46,14h-5.2c-1.4,0-2.6-0.7-3.4-1.8l-2.3-3.5C34.4,7,32.7,6,30.9,6h-9.8c-1.8,0-3.5,1-4.3,2.7l-2.3,3.5c-0.7,1.1-2,1.8-3.4,1.8H6c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4V18C50,15.8,48.2,14,46,14z M26,40c-6.6,0-12-5.4-12-12s5.4-12,12-12s12,5.4,12,12S32.6,40,26,40z"/></g></svg></span>
                </div>
                <div className={styles.inputContainer}>
                    <SuperEditableSpan
                        inputValue={inputValue}
                        spanValue={userName}
                        className={styles.additionalForInput}
                        spanClassName={styles.additionalForSpan}
                        onChangeText={(e) => changeUserNameHandler(e)}
                        onBlur={(e) => onBlurHandler(e)}
                        onKeyPress={(e) => onKeyPressHandler(e)}
                    />
                </div>
                <h3 className={styles.userMailTitle}>{profileInfo && profileInfo.email}</h3>
                <SuperButton onClick={logoutHandler}>
                    Log out
                </SuperButton>
            </div>
        </div>
    )
}