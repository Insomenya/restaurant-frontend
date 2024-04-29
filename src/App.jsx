import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from 'src/helpers';
import { Nav, PrivateRoute } from 'src/components';
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
      <Nav />
      <div className="container pt-4 pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}