import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import EmployeeList from './components/Employee/EmployeeList';

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