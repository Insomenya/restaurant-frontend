import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from 'src/helpers';
import { Hero, MainNavigation, PrivateRoute } from 'src/components';
import { Home } from 'src/home';
import { Login } from 'src/login';
import { menuActions } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export { App };

function App() {
  const dispatch = useDispatch();
  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(() => {
    dispatch(menuActions.getMenu());
  }, []);

  return (
    <div className="app-container">
      <MainNavigation />
      <div className="container pb-4">
        <Hero></Hero>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}