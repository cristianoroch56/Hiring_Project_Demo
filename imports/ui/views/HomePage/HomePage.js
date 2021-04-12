import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Banner, ContactUs, Header, Login, Register, Footer } from './components'
import { useHistory } from 'react-router-dom'
import { HomepageVisited, NavClicked, SignoutSuccess, UserLoggedOut } from '../../actions'

const HomePage = ({ route }) => {
    const history = useHistory();

    const headerRef = useRef(null)
    const loginRef = useRef(null)
    const contactRef = useRef(null)
    const navRef = useRef(null)

    const AuthState = useSelector(({ Auth }) => Auth);

    const [loginOpen, setLoginOpen] = useState(false)
    const [userId, setUserId] = useState(null);

    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        if (window.scrollY > 0) {
            setShowScrollToTop(true);
        }
        function listener() {
            if (window.scrollY > 0) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        }
        window.addEventListener('scroll', listener);
        return () => window.removeEventListener('scroll', listener)
    }, [])

    useEffect(() => {
        setUserId(AuthState.userId)
    }, [AuthState.userId])

    useEffect(() => {
        dispatch(HomepageVisited())
        if (history.location.hash === '#contact-us') {
            setTimeout(() => {
                executeScroll(contactRef);
            }, 300);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', myFunction)

        // Get the header
        var header = navRef?.current;

        // Get the offset position of the navbar
        var sticky = header?.offsetTop;

        // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
            if (window.pageYOffset > sticky) {
                header.classList.add("fixed-top");
            } else {
                header.classList.remove("fixed-top");
            }
        }
        return () => window.removeEventListener('scroll', myFunction)
    }, [])

    const dispatch = useDispatch();

    const toggleLoginOrRegister = (event) => {
        event && event.preventDefault()
        setLoginOpen(!loginOpen)
    }

    const executeScroll = (ref) => ref?.current?.scrollIntoView()

    const logout = (event) => {
        event.preventDefault();
        const user = { ...Meteor.user() };
        Meteor.logout();
        dispatch(UserLoggedOut(user))
        dispatch(NavClicked({
            url: '/#logout'
        }))
        dispatch(SignoutSuccess())
        setLoginOpen(true);
        if (history.location.pathname === '/') {
            executeScroll(headerRef);
            return;
        }
        history.push('/')
    }

    return (
        <>
            <div ref={headerRef}>
                <Banner />
            </div>
            <div ref={navRef}>
                <Header
                    logout={logout}
                    headerRef={headerRef}
                    loginRef={loginRef}
                    contactRef={contactRef}
                    setLoginOpen={setLoginOpen}
                />
            </div>
            <main id="main">
                <div ref={loginRef}>
                    {
                        userId
                            ?
                            null
                            :
                            loginOpen
                                ?
                                <Login switchToRegister={toggleLoginOrRegister} />
                                :
                                <Register switchToLogin={toggleLoginOrRegister} />
                    }
                </div>
                <div ref={contactRef}>
                    <ContactUs />
                </div>
            </main>
            <Footer />
            {
                showScrollToTop && (
                    <a
                        href="#"
                        onClick={(event) => {
                            event.preventDefault();
                            executeScroll(headerRef)
                        }}
                        className="back-to-top d-flex align-items-center justify-content-center active"
                    ><i className="bi bi-arrow-up-short"></i></a>
                )
            }
        </>
    )
}

export default HomePage
