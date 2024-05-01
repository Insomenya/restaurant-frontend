import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from 'src/helpers';
import { Footer, Hero, MainNavigation, PrivateRoute, RegisterForm, TopButton } from 'src/components';
import { Home } from 'src/home';
import { Auth } from 'src/auth';
import { menuActions, authActions } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Cart } from 'src/cart';
import { History } from 'src/history';

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
      <div className="container pb-4">
        <Hero></Hero>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<RegisterForm />} />
          <Route path="/profile" element={<History />} />
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