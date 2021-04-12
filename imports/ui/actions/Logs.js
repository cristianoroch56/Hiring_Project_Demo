import {
    NAV_CLICKED,
    HOMEPAGE_VISITED,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    SUBMITTING_FORM,
    COMMENT_VIEWED,
} from '../constants/ActionTypes';

export const NavClicked = ({ url }) => {
    return {
        type: NAV_CLICKED,
        payload: url
    };
};

export const HomepageVisited = () => {
    return {
        type: HOMEPAGE_VISITED
    };
};

export const UserLoggedIn = (user) => {
    return {
        type: USER_LOGGED_IN,
        payload: user,
    };
};

export const UserLoggedOut = (user) => {
    return {
        type: USER_LOGGED_OUT,
        payload: user,
    };
};

export const SubmittingForm = () => {
    return {
        type: SUBMITTING_FORM,
    };
};

export const CommentViewed = (document) => {
    return {
        type: COMMENT_VIEWED,
        payload: document,
    };
};