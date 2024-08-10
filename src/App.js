import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<SignIn />} /> {/* Redirect unknown routes to SignIn */}
    </Routes>
  );
};

export default App;
