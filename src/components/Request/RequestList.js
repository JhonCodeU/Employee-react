import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const RequestList = ({ employeeId, fetchRequests }) => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [employee, setEmployee] = useState(null);

  const fetchEmployeeRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/get_requests?employee_id=${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/get_employee/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployee(response.data.employee);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/delete_request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchEmployeeRequests(); // Actualizar lista de solicitudes
    } catch (error) {
      console.error('Error eliminando solicitud:', error);
    }
  };

  useEffect(() => {
    if (token && employeeId) {
      fetchEmployeeRequests();
      fetchEmployeeDetails();
    }
  }, [token, employeeId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Solicitudes</h2>
      {employee && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Empleado: {employee.nombre}</h3>
          <p className="text-sm text-gray-500">Salario: ${employee.salario}</p>
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {requests.map(request => (
          <li key={request.id} className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">{request.descripcion}</p>
              <p className="text-sm text-gray-500">{request.resumen}</p>
            </div>
            <div className="ml-4 flex">
              <button
                onClick={() => handleDelete(request.id)}
                className="text-red-600 hover:text-red-900 focus:outline-none"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
