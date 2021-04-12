import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Header,
    Table
} from './components'
import { useHistory } from 'react-router-dom'
import { NavClicked, SignoutSuccess, UserLoggedOut } from '../../actions'

const Admin = ({ }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const AuthState = useSelector(({ Auth }) => Auth);

    useEffect(() => {
        if (!AuthState.userId) history.push('/')
    }, [AuthState.userId])

    const logout = (event) => {
        event.preventDefault();
        const user = { ...Meteor.user() };
        Meteor.logout();
        dispatch(NavClicked({
            url: '/#logout'
        }))
        dispatch(UserLoggedOut(user))
        setTimeout(() => {
            dispatch(SignoutSuccess())
            history.push('/')
        }, 300);
    }

    return (
        <>
            <Header
                logout={logout}
            />
            <main id="main">
                <section style={{ paddingLeft: 50, paddingRight: 50 }}>
                    <Table />
                </section>
            </main>
        </>
    )
}

export default Admin