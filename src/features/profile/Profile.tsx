import React from 'react'
import {useAppSelector} from '../../common/hooks/hooks';
import {Navigate} from 'react-router-dom';

export const Profile = () => {
    const registerSuccess = useAppSelector(state => state.register.registerSuccess)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if ( !isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (


        <div>
            Profile
        </div>
    )
}