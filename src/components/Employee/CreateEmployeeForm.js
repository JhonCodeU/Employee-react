import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const CreateEmployeeForm = ({ setShowCreateForm, fetchEmployees }) => {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [salario, setSalario] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/create_employee', {
        nombre,
        fecha_ingreso: fechaIngreso,
        salario
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowCreateForm(false);
      fetchEmployees();  // Actualizar lista de empleados
    } catch (error) {
      console.error('Error creando empleado:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Empleado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Ingreso</label>
            <input
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salario</label>
            <input
              type="number"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;