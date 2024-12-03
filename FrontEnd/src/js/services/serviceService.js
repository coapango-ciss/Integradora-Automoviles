import { request } from "./api.js";

const BASE_ENDPOINT = '/service';

export async function findAllServices() {
    try {
        return await request(BASE_ENDPOINT, "GET",null);  
    } catch (error) {
        console.error("Error al cargar los servicios", error);
        throw error;
    }
}

export async function findServiceById(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "GET",null);  
    } catch (error) {
        console.error("Error al cargar servicio:", error);
        throw error;
    }
}

export async function saveService(service) {
    try {
        return await request(BASE_ENDPOINT, "POST",service);  
    } catch (error) {
        console.error("Error al guardar el servicio:", error);
        throw error;
    }
}

export async function updateService(id,service) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "PUT",service);  
    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        throw error;
    }
}

export async function deleteService(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "DELETE",null);  
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        throw error;
    }
}