import React from 'react';
import styles from './App.module.css';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Header} from "../features/header/Header";
import {Login} from "../features/login/Login";
import {Registration} from "../features/registration/Registration";
import {Profile} from "../features/profile/Profile";
import {Error404} from "../features/error404/Error404";
import {PasswordRecovery} from "../features/password/passwordRec/passwordRecovery";
import {NewPassword} from "../features/password/newPassword/NewPassword";
import {TestComponent} from "../features/testComponent/TestComponent";

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
