import React, { Suspense, useEffect, useState } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { Banner, Contact, Header } from './components'
import { useHistory } from 'react-router-dom'

const GeneralLayout = ({ route }) => {
    const history = useHistory();

    useEffect(() => {
        console.log(history.location.pathname)
    }, [history.location.pathname])

    return (
        <>
            <Header />
            <main id="main">
                {/* <Banner />
                <Contact /> */}
                <Suspense fallback={<LinearProgress />}>
                    {renderRoutes(route.routes)}
                </Suspense>
            </main>
        </>
    )
}

export default GeneralLayout
