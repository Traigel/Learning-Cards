import React, {useEffect} from 'react';
import styles from './App.module.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "../features/header/Header";
import {Login} from "../features/login/Login";
import {Error404} from "../features/error404/Error404";
import {DisplayOnError} from "../common/components/displayOnError/DisplayOnError";
import CircularProgress from '@mui/material/CircularProgress';
import {initializeAppTC} from "./app-reducer";
import {Profile} from "../features/profile/Profile";
import {Registration} from '../features/registration/Registration';
import {ForgotPassword} from '../features/password/forgotPassword/ForgotPassword';
import {NewPassword} from '../features/password/newPassword/NewPassword';
import {CheckEmail} from '../features/password/checkEmail/CheckEmail';
import {useAppDispatch, useAppSelector} from '../common/hooks/hooks';
import {Packs} from "../features/packs/Packs";
import {TEST} from "../features/packs/TEST";

export const App = () => {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div className={styles.init}>
            <CircularProgress color="inherit"/>
        </div>
    }

    return (
        <div className={styles.appBlock}>
            <Header/>
            <DisplayOnError/>
            <div className={styles.appContainer}>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                    {/*<Route path={'/packs'} element={<TEST/>}/>*/}
                    <Route path={'/packs'} element={<Packs/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                    <Route path={'/new-password/:token'} element={<NewPassword/>}/>
                    <Route path={'/forgot'} element={<ForgotPassword/>}/>
                    <Route path={'/checkEmail'} element={<CheckEmail/>}/>
                    <Route path={'/error404'} element={<Error404/>}/>
                    <Route path={'/cards/:packId'} element={<h1>132</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/error404'}/>}/>
                </Routes>
            </div>
        </div>
    );
}
