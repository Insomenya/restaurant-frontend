import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from 'src/helpers';
import { Footer, Hero, MainNavigation, PrivateRoute, TopButton } from 'src/components';
import { Home } from 'src/home';
import { Auth } from 'src/auth';
import { menuActions, authActions } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Cart } from 'src/cart';
import { History } from 'src/history';
import { About } from './about';

export { App };

function App() {
  const isNotMobile = useMediaQuery({ query: '(min-width: 992px)' });
  const token = useSelector(x => x.auth.user?.token);
  const dispatch = useDispatch();
  const topRef = useRef();
  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(() => {
    dispatch(menuActions.getMenu());
    if (token) {
      dispatch(authActions.verifyToken({ token }));
    }
  }, []);

  return (
    <div className="app-container">
      <a ref={topRef}></a>
      <MainNavigation />
      <div className="pb-4">
        <Hero></Hero>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {isNotMobile &&
          <TopButton target={topRef} displayAfter={150}></TopButton>
        }
      </div>
      <Footer></Footer>
    </div>
  );
}