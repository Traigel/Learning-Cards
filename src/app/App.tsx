import React from 'react';
import styles from './App.module.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from "../features/header/Header";
import {Login} from "../features/login/Login";
import {Error404} from "../features/error404/Error404";
import {DisplayOnError} from "../common/components/displayOnError/DisplayOnError";

export const App = () => {



    return (
        <div className={styles.appBlock}>
            <Header/>
            <DisplayOnError/>
            <div className={styles.appContainer}>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<h1>register</h1>}/>
                    <Route path={'/profile'} element={<h1>profile</h1>}/>
                    <Route path={'/error404'} element={<Error404/>}/>
                    <Route path={'*'} element={<Navigate to={'/error404'}/>}/>
                </Routes>
            </div>
        </div>
    );
}
