import React, {ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'
import styles from './Profile.module.css'
import userAvatar from '../../assets/images/userAvata.png'
import SuperButton from '../../common/components/superButton/SuperButton';
import SuperEditableSpan from '../../common/components/superEditableSpan/SuperEditableSpan';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {logoutTC, updateUserInfoTC} from '../auth/auth-reducer';
import {Navigate, NavLink} from 'react-router-dom';
import {SvgSelector} from '../../common/components/svgSelector/svgSelector';
import {convertFileToBase64} from '../../common/utils/convertBase64';
import {errorHandlerUtil} from '../../common/utils/errors-utils';

export const Profile = () => {

    const profile = useAppSelector((state) => state.auth.profile)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const page = useAppSelector((state) => state.packs.page)
    const pageCount = useAppSelector((state) => state.packs.pageCount)

    const [inputValue, setInputValue] = useState(profile?.name)
    const dispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)
    const minFileSize = 40000;
    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            if (file.size < minFileSize) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(updateUserInfoTC({avatar: file64}));
                });
            } else {
                return errorHandlerUtil(e, dispatch)
            }
        }
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const changeUserNameHandler = (e: string) => {
        setInputValue(e)
    }

    const handler = (value: string) => {
        if (profile && value !== profile.name && value) {
            dispatch(updateUserInfoTC({name: value, avatar: ''}))
        }
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        handler(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handler(e.currentTarget.value)
        }
    }

    useEffect(() => {
        if (profile) {
            setInputValue(profile.name)
        }
    }, [profile])

    const finalUserAvatar = profile?.avatar ? profile.avatar : userAvatar

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.backToCardsBlock}>
                <NavLink to={`/packs?page=${page}&pageCount=${pageCount}`} className={styles.goToPacksTitle}>
                    <SvgSelector svgName={"arrow"}/>
                    <span className={styles.arrowText}> Back to packs list</span>
                </NavLink>
            </div>
            <div className={styles.profileBlock}>
                <h2 className={styles.title}>Personal Information</h2>
                <div className={styles.userAvatarContainer}>
                    <img className={styles.userAvatar}
                         src={finalUserAvatar}
                         alt={'user-avatar'}
                    />
                    <div
                        className={styles.photoButton}
                        onClick={selectFileHandler}
                    >
                        <SvgSelector svgName={'photo'}/>
                    </div>
                    <input style={{display: 'none'}}
                           ref={inputRef}
                           type="file"
                           onChange={uploadHandler}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <SuperEditableSpan
                        inputValue={inputValue}
                        spanValue={profile?.name}
                        className={styles.additionalForInput}
                        spanClassName={styles.additionalForSpan}
                        onChangeText={(e) => changeUserNameHandler(e)}
                        onBlur={(e) => onBlurHandler(e)}
                        onKeyDown={(e) => onKeyDownHandler(e)}
                    />
                </div>
                <div className={styles.userMailTitle}>{profile && profile.email}</div>
                <div className={styles.userMailTitle}>Public card packs count: {profile && profile.publicCardPacksCount}</div>
                <SuperButton onClick={logoutHandler} className={styles.logOutBtn}>
                    <SvgSelector svgName={'logOut'}/> Log out
                </SuperButton>
            </div>
        </div>
    )
}