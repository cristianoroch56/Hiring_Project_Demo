import React from 'react'

const Footer = () => {
    return (
        <footer id="footer">

            <div className="footer-top">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h3>Demo</h3>
                            <p>
                                A108 Adam Street <br />
                                    New York, NY 535022<br />
                                        United States <br /><br />
                                <strong>Téléphoner:</strong> +1 5589 55488 55<br />
                                <strong>E-mail:</strong> info@example.com<br />
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Liens utiles</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Accueil</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">À propos de nous</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Prestations de service</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Conditions d'utilisation</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Politique de confidentialité</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Nos services</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Création de sites web</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Développement web</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Gestion des produits</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Commercialisation</a></li>
                                <li><i className="bx bx-chevron-right"></i> <a href="#">Conception graphique</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Nos réseaux sociaux</h4>
                            <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
                            <div className="social-links mt-3">
                                <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                                <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                                <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
