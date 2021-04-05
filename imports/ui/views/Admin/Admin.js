import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import Header from './components/Header'
// import Table from './components/Table'
import {
    Header,
    Table
} from './components'
import { useHistory } from 'react-router-dom'
import { SignoutSuccess } from '../../actions'

const Admin = ({ }) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const AuthState = useSelector(({ Auth }) => Auth);

    useEffect(() => {
        if (!AuthState.userId) history.push('/')
    }, [AuthState.userId])

    const logout = (event) => {
        event.preventDefault();
        Meteor.logout();
        dispatch(SignoutSuccess())
        history.push('/')
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