import logo from '../assets/logo_clicspy_profile.png';
import './Toolbar.css'
import icon_dashboard from '../assets/icon_dashboard.png'
import icon_funnel from '../assets/icon_funnel.png'
import icon_cademy from '../assets/icon_cademy.png'
import { URL_CADEMY, URL_DASHBOARD, URL_FUNNELS } from "../utils/Constants";
import Dropdown from './Dropdown/Dropdown';

export default function Toolbar() {

    const handleClick = (boton) => {
        switch (boton) {
            case 'anuncios':
                // window.open('https://clicspy.com/dashboard/?token=' + token, '_blank');
                window.open(URL_DASHBOARD, '_blank');
                break;
            case 'funnels':
                // window.open('https://clicspy.com/afunnels/?token=' + token, '_blank');
                window.open(URL_FUNNELS, '_blank');
                break;
            case 'cademy':
                // window.open('https://clicspy.com/cademy/?token=' + token, '_blank');
                window.open(URL_CADEMY, '_blank');
                break;
            default:
                return
        }
    }

    return (

        <div className="navbar">
            <img src={logo} alt="Logo User Profile" />

            <ul className="toolbar">
                <li>
                    <button onClick={() => handleClick('anuncios')} className="button"
                        title="Ir al Dashboard para ver Mis Anuncios Guardados">
                        <img className="toolbar-icons-buttons" src={icon_dashboard} alt="Dashboard" />
                        <span>Anuncios</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => handleClick('funnels')} className="button" title="Funnels">
                        <img className="toolbar-icons-buttons" src={icon_funnel} alt="Funnels" />
                        <span>Embudos</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => handleClick('cademy')} className="button"
                        title="Ir a Cademy para Entrenarme">
                        <img className="toolbar-icons-buttons" src={icon_cademy} alt="Cademy" />
                        <span>Academia</span>
                    </button>
                </li>
                <li>
                    <a href="#cademy">
                        <Dropdown />
                    </a>
                </li>
            </ul>
        </div>
    );
}
