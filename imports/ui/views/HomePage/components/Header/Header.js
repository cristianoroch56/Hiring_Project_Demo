import React, { Fragment, useEffect, useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { NavClicked } from '../../../../actions';

const Header = ({ logout, headerRef, loginRef, contactRef, setLoginOpen }) => {
    const AuthState = useSelector(({ Auth }) => Auth);

    const [userId, setUserId] = useState(null);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        setUserId(AuthState.userId)
    }, [AuthState.userId])

    const executeScroll = (ref) => ref?.current?.scrollIntoView()

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
                                    executeScroll(headerRef)
                                    dispatch(NavClicked({
                                        url: '/'
                                    }))
                                }}>Accueil</RouterLink>
                            </li>
                            <li>
                                <RouterLink className="nav-link scrollto" to="/#contact-us" onClick={e => {
                                    e.preventDefault();
                                    executeScroll(contactRef)
                                    dispatch(NavClicked({
                                        url: '/#contact-us'
                                    }))
                                }}>Formulaire de contact</RouterLink>
                            </li>
                            {
                                userId && (
                                    <li>
                                        <RouterLink className="nav-link scrollto" to="/admin" onClick={(event) => {
                                            event.preventDefault();
                                            dispatch(NavClicked({
                                                url: '/admin'
                                            }))
                                            history.push('/admin')
                                        }}>Administration</RouterLink>
                                    </li>
                                )
                            }
                            <li>
                                {
                                    userId
                                        ?
                                        <RouterLink className="nav-link scrollto" to="#logout" onClick={logout}>Se déconnecter</RouterLink>
                                        :
                                        <RouterLink className="nav-link scrollto" to="#login" onClick={e => {
                                            e.preventDefault();
                                            executeScroll(loginRef)
                                            dispatch(NavClicked({
                                                url: '/#login'
                                            }))
                                            setLoginOpen(true)
                                        }}>Se connecter</RouterLink>

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
