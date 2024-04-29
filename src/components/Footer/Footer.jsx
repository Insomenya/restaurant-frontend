import classes from './Footer.module.css';
import { NavLink } from 'react-router-dom';

export { Footer };

function Footer() {

    return (
        <div className={`${classes.footer}`}>
            <div className="container">
                <div className='d-flex flex-wrap justify-content-between align-items-center'>
                    <p className='col-md-4 mb-0'>© 2024 SV, Все права защищены</p>
                    <a href="#" className={`col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none`}>
                        <img src="src/assets/img/SV.png" className={`${classes.logo}`} />
                    </a>
                    <ul className={`nav col-md-4 justify-content-end ${classes.footer_nav}`}>
                        <li className='nav-item mx-2'>
                            <NavLink to="/">Меню</NavLink>
                        </li>
                        <li className='nav-item mx-2'>
                            <NavLink to="/about">О нас</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}