import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Nav.module.css'

import { authActions } from 'src/store';

export { Nav };

function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());
    
    return (
        <div className="container">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                    <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
                </div>
            </nav>
        </div>
    );
}