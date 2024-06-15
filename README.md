Claro, aquí tienes un ejemplo de un `README.md` que describe todo lo que hemos hecho, incluyendo la conexión al backend en `localhost` y el puerto `3000`.

```markdown
# Employee Management System

Este proyecto es un sistema de gestión de empleados que permite crear, listar, editar y eliminar empleados, así como crear, listar y eliminar solicitudes asociadas a cada empleado. La aplicación está construida con React para el frontend y se conecta a un backend en `localhost` en el puerto `3000`.

## Requisitos

- Node.js
- npm (o yarn)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/employee-management-system.git
   cd employee-management-system
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

   o si usas yarn:

   ```bash
   yarn install
   ```

## Configuración del Backend

Asegúrate de que el backend esté corriendo en `localhost` en el puerto `3000`. Puedes ajustar las configuraciones del backend según sea necesario. El backend debe proporcionar los siguientes endpoints:

- `GET /api/v1/get_employees`: Obtener todos los empleados
- `POST /api/v1/create_employee`: Crear un nuevo empleado
- `GET /api/v1/get_request_by_employee/{id}`: Obtener las solicitudes de un empleado específico
- `POST /api/v1/create_request`: Crear una nueva solicitud
- `DELETE /api/v1/delete_request/{id}`: Eliminar una solicitud específica
- `GET /api/v1/get_employee/{id}`: Obtener la información de un empleado específico

## Estructura del Proyecto

El proyecto está estructurado en varios componentes de React para manejar las diferentes funcionalidades:

- **AuthContext**: Proporciona contexto de autenticación para manejar el token de acceso.
- **EmployeeList**: Lista todos los empleados y proporciona opciones para crear, editar y eliminar empleados.
- **CreateEmployeeForm**: Formulario para crear un nuevo empleado.
- **RequestList**: Lista todas las solicitudes asociadas a un empleado específico.
- **CreateRequestForm**: Formulario para crear una nueva solicitud para un empleado específico.