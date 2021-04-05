/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

import Homepage from './views/HomePage'
import Admin from './views/Admin'

const routes = [
    {
        path: '/',
        exact: true,
        component: Homepage,
    },
    {
        path: '/admin',
        exact: true,
        component: Admin,
    },
]

export default routes
