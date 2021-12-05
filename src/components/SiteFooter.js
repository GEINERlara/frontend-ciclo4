import FacebookLogo from '../assets/facebook-icon.svg'
import InstagramLogo from '../assets/instagram-icon.svg'
import YoutubeLogo from '../assets/youtube-icon-red.svg'
import './SiteFooter.css'

const SiteFooter= () => {
    return (
    <div>
        <div className="site-footer">
            <a href="/" className="site-footer__logo-link" target="_blank">
                <img className="site-footer__logo-img" 
                    src= {FacebookLogo}
                    alt="Facebook"
                />
            </a>
            <a href="/" className="site-footer__logo-link" target="_blank">
                <img className="site-footer__logo-img" 
                    src= {InstagramLogo}
                    alt="Instragram"
                />
            </a>
            <a href="/" className="site-footer__logo-link" target="_blank">
                <img className="site-footer__logo-img" 
                    src= {YoutubeLogo}
                    alt="Youtube"
                />
            </a>
        </div>
        <div className="site-footer__footprint">
            <p className="site-footer__footprint-text">
                @2021 - Todos los derechos reservados.
            </p> 
         </div>
    </div>
    )
}
export default SiteFooter
