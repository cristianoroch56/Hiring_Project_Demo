import React, { Fragment, useEffect } from 'react'
import Slide from '@material-ui/core/Slide';

const Banner = () => {
    return (
        <section id="hero" style={{ backgroundImage: `url(/assets/img/hero-bg.jpg)` }}>
            <Slide direction="up" timeout={1500} in={true} mountOnEnter unmountOnExit>
                <div className="hero-container">
                    <h1>Commencez votre expérience numérique avec <span>Demo</span></h1>
                    <h2>Nous sommes une équipe de designers talentueux qui créent des sites Web avec Bootstrap</h2>
                    <a href="#about" className="btn-get-started scrollto">Commencer</a>
                </div>
            </Slide>
        </section>
    )
}

export default Banner
