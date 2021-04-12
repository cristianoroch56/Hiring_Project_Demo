import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LogMonitor = () => {
    const LogsState = useSelector(({ Logs }) => Logs);

    useEffect(() => {
        let item = "";
        switch (LogsState.url) {
            case '/':
                item = 'Homepage'
                break;
            case '/admin':
                item = 'Administration'
                break;
            case '/#contact-us':
                item = 'Contact Us'
                break;
            case '/#login':
                item = 'Login'
                break;
            case '/#logout':
                item = 'Logout'
                break;
            default:
                break;
        }
        if (item) {
            console.log("Nav Item Clicked:", item)
        }
        // console.log(LogsState.url)
    }, [LogsState.url, LogsState.navClicked])

    useEffect(() => {
        if (LogsState.homepageVisited !== "0")
            console.log("User is viewing homepage")
    }, [LogsState.homepageVisited])

    useEffect(() => {
        if (LogsState.loggedIn !== "0")
            console.log("User is logged in:", LogsState.user.emails[0].address)
    }, [LogsState.loggedIn])

    useEffect(() => {
        if (LogsState.loggedOut !== "0")
            console.log("User is logged out:", LogsState.user.emails[0].address)
    }, [LogsState.loggedOut])

    useEffect(() => {
        if (LogsState.submittingForm !== "0")
            console.log("Submitting form")
    }, [LogsState.submittingForm])

    useEffect(() => {
        if (LogsState.commentViewed !== "0" && LogsState.document)
            console.log("Comment Viewed for document with id:", LogsState.document._id)
    }, [LogsState.commentViewed])

    return null;
}

export default LogMonitor