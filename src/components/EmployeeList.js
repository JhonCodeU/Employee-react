import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EmployeeList = () => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/get_employees', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployees(response.data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (token) {
      fetchEmployees();
    }
  }, [token]);

  return (
    <div>
      <h2>Listado de Empleados</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.nombre} - {employee.salario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;