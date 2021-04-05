import React, { Fragment, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import gql from "graphql-tag";

const query = gql`
    query User {
        user {
            _id
        }
    }
`;

const Header = () => {
    const history = useHistory()

    const { client, loading, data } = useQuery(
        query,
    );

    const user = (data && data.user) || {};

    const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

    const logout = async (event) => {
        event.preventDefault();
        Meteor.logout();
        await sleep(500)
        client.resetStore();
        history.push('/login');
    }

    if (loading) return null

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
                                <RouterLink className="nav-link scrollto" to="/">Home</RouterLink>
                            </li>
                            <li>
                                <RouterLink className="nav-link scrollto" to="/contact-us">Contact</RouterLink>
                            </li>
                            {
                                Meteor.user() && (
                                    <li>
                                        <RouterLink className="nav-link scrollto" to="/admin">Admin</RouterLink>
                                    </li>
                                )

                            }
                            <li>
                                {
                                    Meteor.user()
                                        ?
                                        <RouterLink className="nav-link scrollto" to="/logout" onClick={logout}>Log out</RouterLink>
                                        :
                                        <RouterLink className="nav-link scrollto" to="/login">Log in</RouterLink>

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
