import React, { Fragment, useEffect } from 'react'

const Banner = () => {
    return (
        <section id="hero">
            <div className="hero-container" data-aos="fade-up">
                <h1>Start your new digital experience with <span>Demo</span></h1>
                <h2>We are team of talented designers making websites with Bootstrap</h2>
                <a href="#about" className="btn-get-started scrollto">Get Started</a>
            </div>
        </section>
    )
}

export default Banner
