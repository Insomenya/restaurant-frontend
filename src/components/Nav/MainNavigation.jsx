import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './MainNavigation.module.css'
import { CiForkAndKnife, CiShoppingBasket, CiLocationOn  } from 'react-icons/ci'

import { authActions } from 'src/store';
import { useCart } from 'react-use-cart';

import logoUrl from 'src/assets/img/SV.png';

export { MainNavigation };

function MainNavigation() {
    const { totalUniqueItems, isEmpty } = useCart();
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark ${classes.custom_nav}`}>
            <div className="container">
                <NavLink to="/" className='navbar-brand'>
                    <img src={logoUrl} className={`${classes.logo}`} />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-0">
                        <li className='nav-item'>
                            <NavLink to="/" className="nav-link">
                                <CiForkAndKnife></CiForkAndKnife> Меню
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/about" className="nav-link">
                                <CiLocationOn></CiLocationOn> О нас
                            </NavLink>
                        </li>
                    </ul>
                    <form className='d-flex'>
                        <ul className="navbar-nav mb-2 mb-lg-0 w-100">
                            <li className='nav-item mb-2 mb-lg-0 mx-0 mx-lg-2'>
                                {authUser ?
                                    (
                                        <NavLink to="/cart" className="nav-link">
                                            <CiShoppingBasket></CiShoppingBasket> Корзина {isEmpty ? '' :
                                                (
                                                    <span className={`${classes.cart_count}`}>{totalUniqueItems}</span>
                                                )
                                            }
                                        </NavLink>
                                    ) :
                                    (
                                        <NavLink to="/auth/" className="nav-link">
                                            <CiShoppingBasket></CiShoppingBasket> Корзина
                                        </NavLink> 
                                    )
                                }
                            </li>
                            {authUser ?
                                (
                                    <li className='nav-item dropdown'>
                                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {authUser.username}
                                        </a>
                                        <ul className='dropdown-menu navbar-light' aria-labelledby="navbarDropdownMenuLink">
                                            <li>
                                                <NavLink to="/profile" className={`nav-link dropdown-item ${classes.custom_dropdown_item}`}>История заказов</NavLink>
                                            </li>
                                            <li>
                                                <button onClick={logout} className={`btn btn-link nav-item nav-link dropdown-item ${classes.custom_dropdown_item}`}>Выйти</button>
                                            </li>
                                        </ul>
                                    </li>
                                ) :
                                (
                                    <li className='nav-item'>
                                        <NavLink to="/auth" className={`nav-link ${classes.custom_button}`}>Войти</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </form>
                </div>
            </div>
        </nav>
    );
}