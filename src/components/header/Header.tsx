import React from 'react'
import {NavLink} from "react-router-dom";
import {Registration} from "../registration/Registration";
import {Profile} from "../profile/Profile";
import {TestComponent} from "../testComponent/TestComponent";

export const Header = () => {

    return (
        <div>
            <NavLink to={'/login'}>Login</NavLink>
            _
            <NavLink to={'/registration'}>Registration</NavLink>
            _
            <NavLink to={'/profile'}>Profile</NavLink>
            ...
            <NavLink to={'/testComponent'}>TestComponent</NavLink>
        </div>
    )
}

