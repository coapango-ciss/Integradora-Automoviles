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
