import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import CreateEmployeeForm from './CreateEmployeeForm';
import CreateRequestForm from '../Request/CreateRequestForm';
import RequestList from '../Request/RequestList';

const EmployeeList = () => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateRequestForm, setShowCreateRequestForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showRequestList, setShowRequestList] = useState(false);

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

  useEffect(() => {
    if (token) {
      fetchEmployees();
    }
  }, [token]);

  const handleEdit = (id) => {
    // Implementar lógica para editar empleado con el ID proporcionado
    console.log(`Editar empleado con ID ${id}`);
  };

  const handleDelete = (id) => {
    // Implementar lógica para eliminar empleado con el ID proporcionado
    console.log(`Eliminar empleado con ID ${id}`);
  };

  const handleCreateRequest = (id) => {
    setSelectedEmployeeId(id);
    setShowCreateRequestForm(true);
  };

  const handleShowRequests = (id) => {
    setSelectedEmployeeId(id);
    setShowRequestList(true);
  };

  const fetchRequests = async (employeeId) => {
    if (employeeId) {
      // Implementar lógica para obtener solicitudes del empleado
      console.log(`Fetching requests for employee ID ${employeeId}`);
    }
  };

  useEffect(() => {
    if (selectedEmployeeId) {
      fetchRequests(selectedEmployeeId);
    }
  }, [selectedEmployeeId]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Crear Empleado
        </button>
      </div>
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {employees.map(employee => (
            <li key={employee.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{employee.nombre}</p>
                <p className="text-sm text-gray-500">Salario: ${employee.salario}</p>
              </div>
              <div className="ml-4 flex">
                <button
                  onClick={() => handleCreateRequest(employee.id)}
                  className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none"
                >
                  Crear Solicitud
                </button>
                <button
                  onClick={() => handleShowRequests(employee.id)}
                  className="ml-2 text-green-600 hover:text-green-900 focus:outline-none"
                >
                  Ver Solicitudes
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="ml-2 text-red-600 hover:text-red-900 focus:outline-none"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showCreateForm && <CreateEmployeeForm setShowCreateForm={setShowCreateForm} fetchEmployees={fetchEmployees} />}
      {showCreateRequestForm && (
        <CreateRequestForm
          setShowCreateRequestForm={setShowCreateRequestForm}
          fetchRequests={() => fetchRequests(selectedEmployeeId)}
          employeeId={selectedEmployeeId}
        />
      )}
      {showRequestList && <RequestList employeeId={selectedEmployeeId} />}
    </div>
  );
};

export default EmployeeList;
