import { request } from "./api.js";

const BASE_ENDPOINT = '/employee';

export async function findAllEmployees() {
    try {
        return await request(BASE_ENDPOINT, "GET");  
    } catch (error) {
        console.error("Error al cargar las empleados:", error);
        throw error;
    }
}

export async function findEmployeeById(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "GET",null);  
    } catch (error) {
        console.error("Error al cargar empleado:", error);
        throw error;
    }
}

export async function saveEmployee(employee) {
    try {
        return await request(BASE_ENDPOINT, "POST",employee);  
    } catch (error) {
        console.error("Error al guardar la empleado:", error);
        throw error;
    }
}

export async function updateEmployee(id,employee) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "PUT",employee);  
    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        throw error;
    }
}

export async function deleteEmployee(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "DELETE",null);  
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        throw error;
    }
}
