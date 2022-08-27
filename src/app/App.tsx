import React from 'react';
import styles from './App.module.css';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Header} from "../components/header/Header";
import {Login} from "../components/login/Login";
import {Registration} from "../components/registration/Registration";
import {Profile} from "../components/profile/Profile";
import {Error404} from "../components/error404/Error404";
import {PasswordRecovery} from "../components/password/passwordRec/passwordRecovery";
import {NewPassword} from "../components/password/newPassword/NewPassword";
import {TestComponent} from "../components/testComponent/TestComponent";

export const App = () => {
  return (
      <HashRouter>
        <div className={styles.app}>
            <Header/>
            <div className={styles.pages}>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>

                    <Route path={'/passwordRecovery'} element={<PasswordRecovery/>}/>
                    <Route path={'/newPassword'} element={<NewPassword/>}/>

                    <Route path={'/testComponent'} element={<TestComponent/>}/>

                    <Route path={'/*'} element={<Error404/>}/>
                </Routes>
            </div>
        </div>
      </HashRouter>

  );
}
