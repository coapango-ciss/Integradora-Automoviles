import { request } from "./api.js";

const BASE_ENDPOINT = '/customer';

export async function findAllCustomers() {
    try {
        return await request(BASE_ENDPOINT, "GET");  
    } catch (error) {
        console.error("Error al cargar las marcas:", error);
        throw error;
    }
}

export async function findMyCustomers() {
    try {
        return await request(`${BASE_ENDPOINT}/mine`, "GET");  
    } catch (error) {
        console.error("Error al cargar las marcas:", error);
        throw error;
    }
}

export async function findCustomerById(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "GET",null);  
    } catch (error) {
        console.error("Error al cargar marca:", error);
        throw error;
    }
}

export async function saveCustomer(customer) {
    try {
        return await request(BASE_ENDPOINT, "POST",customer);  
    } catch (error) {
        console.error("Error al guardar la marca:", error);
        throw error;
    }
}

export async function updateCustomer(id,customer) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "PUT",customer);  
    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        throw error;
    }
}

export async function deleteCustomer(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "DELETE",null);  
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        throw error;
    }
}
