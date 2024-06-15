import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Login />
        <EmployeeList />
      </div>
    </AuthProvider>
  );
}

export default App;