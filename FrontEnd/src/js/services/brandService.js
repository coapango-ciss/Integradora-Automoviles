import { request } from "./api.js";

const BASE_ENDPOINT = '/brand';

export async function findAllBrands() {
    try {
        return await request(BASE_ENDPOINT, "GET");  
    } catch (error) {
        console.error("Error al cargar las marcas:", error);
        throw error;
    }
}

export async function findBrandById(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "GET",null);  
    } catch (error) {
        console.error("Error al cargar marca:", error);
        throw error;
    }
}

export async function saveBrand(brand) {
    try {
        return await request(BASE_ENDPOINT, "POST",brand);  
    } catch (error) {
        console.error("Error al guardar la marca:", error);
        throw error;
    }
}

export async function updateBrand(id,brand) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "PUT",brand);  
    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        throw error;
    }
}

export async function deleteBrand(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "DELETE",null);  
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        throw error;
    }
}
