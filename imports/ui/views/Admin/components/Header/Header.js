import React, { Fragment, useEffect, useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FetchUser, NavClicked } from '../../../../actions';

const Header = ({ logout }) => {
    const AuthState = useSelector(({ Auth }) => Auth);

    const [userId, setUserId] = useState(null);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        setUserId(AuthState.userId)
    }, [AuthState.userId])

    return (
        <Fragment>
            <header id="header" className="d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <h1 className="text-light">
                            <RouterLink to="/">
                                <span>Demo</span>
                            </RouterLink>
                        </h1>
                    </div>

                    <nav id="navbar" className="navbar">
                        <ul>
                            <li>
                                <RouterLink className="nav-link scrollto" to="/" onClick={e => {
                                    e.preventDefault();
                                    dispatch(NavClicked({
                                        url: '/'
                                    }))
                                    history.push('/')
                                }}>Accueil</RouterLink>
                            </li>
                            <li>
                                <RouterLink
                                    className="nav-link scrollto"
                                    to={{
                                        pathname: "/",
                                        hash: "#contact-us",
                                    }}
                                    onClick={e => {
                                        e.preventDefault();
                                        dispatch(NavClicked({
                                            url: '/#contact-us'
                                        }))
                                        history.push('/#contact-us')
                                    }}>Formulaire de contact</RouterLink>
                            </li>
                            {
                                userId && (
                                    <li>
                                        <RouterLink className="nav-link scrollto" to="/admin" onClick={e => {
                                            e.preventDefault();
                                            dispatch(NavClicked({
                                                url: '/admin'
                                            }))
                                        }}>Administration</RouterLink>
                                    </li>
                                )
                            }
                            <li>
                                <RouterLink className="nav-link scrollto" to="#logout" onClick={logout}>Se déconnecter</RouterLink>
                            </li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>
        </Fragment>
    )
}

export default Header;
