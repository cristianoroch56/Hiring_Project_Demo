import React, { Fragment, useEffect, useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FetchUser } from '../../../../actions';

const Header = ({ logout, }) => {
    const AuthState = useSelector(({ Auth }) => Auth);

    const [userId, setUserId] = useState(null);

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
                                <RouterLink className="nav-link scrollto" to="/">Accueil</RouterLink>
                            </li>
                            <li>
                                <RouterLink className="nav-link scrollto" to={{
                                    pathname: "/",
                                    hash: "#contact-us",
                                }} >Formulaire de contact</RouterLink>
                            </li>
                            {
                                userId && (
                                    <li>
                                        <RouterLink className="nav-link scrollto" to="/admin">Administration</RouterLink>
                                    </li>
                                )
                            }
                            <li>
                                {
                                    userId
                                        ?
                                        <RouterLink className="nav-link scrollto" to="#logout" onClick={logout}>Se déconnecter</RouterLink>
                                        :
                                        <RouterLink className="nav-link scrollto" to="/login">Se connecter</RouterLink>

                                }
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