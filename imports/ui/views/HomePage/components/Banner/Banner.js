import React, { Fragment, useEffect } from 'react'
import Slide from '@material-ui/core/Slide';

const Banner = () => {
    return (
        <section id="hero" style={{ backgroundImage: `url(/assets/img/hero-bg.jpg)` }}>
            <Slide direction="up" timeout={1500} in={true} mountOnEnter unmountOnExit>
                <div className="hero-container">
                <h1>Commencez votre expérience numérique avec <span>us</span></h1>
                    <h2>Maximisez votre visibilité en ligne</h2>
                    <a href="#about" className="btn-get-started scrollto">Commencer</a>
                </div>
            </Slide>
        </section>
    )
}

export default Banner
