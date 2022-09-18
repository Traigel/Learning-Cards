import React, {useEffect} from 'react';
import styles from './App.module.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "../features/header/Header";
import {Login} from "../features/login/Login";
import {Error404} from "../features/error404/Error404";
import {DisplayOnError} from "../common/components/displayOnError/DisplayOnError";
import CircularProgress from '@mui/material/CircularProgress';
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC} from "./app-reducer";

export const App = () => {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div className={styles.init} >
            <CircularProgress color="inherit"/>
        </div>
    }

    return (
        <div className={styles.appBlock}>
            <Header/>
            <DisplayOnError/>
            <div className={styles.appContainer}>
                <Routes>
                    <Route path={'/profile'} element={<h1>profile</h1>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<h1>register</h1>}/>
                    <Route path={'/password'} element={<h1>new password</h1>}/>
                    <Route path={'/error404'} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={'/error404'}/>}/>
                </Routes>
            </div>
        </div>
    );
}
