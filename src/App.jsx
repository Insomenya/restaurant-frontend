import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from 'src/helpers';
import { Footer, Hero, MainNavigation, PrivateRoute, TopButton } from 'src/components';
import { Home } from 'src/home';
import { Login } from 'src/login';
import { menuActions } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Cart } from 'src/cart';

export { App };

function App() {
  const isNotMobile = useMediaQuery({ query: '(min-width: 992px)' });
  const dispatch = useDispatch();
  const topRef = useRef();
  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(() => {
    dispatch(menuActions.getMenu());
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
          <Route path="/login" element={<Login />} />
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