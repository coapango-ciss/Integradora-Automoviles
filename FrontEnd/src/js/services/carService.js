import { request } from "./api.js";

const BASE_ENDPOINT = '/car';

export async function findAllCars() {
    try {
        return await request(BASE_ENDPOINT, "GET",null);  
    } catch (error) {
        console.error("Error al cargar los automoviles", error);
        throw error;
    }
}

export async function findCarByStatus(status) {
    try {
        return await request(`${BASE_ENDPOINT}/sold/${status}`, "GET",null);  
    } catch (error) {
        console.error("Error al cargar los automoviles", error);
        throw error;
    }
}


export async function findCarById(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "GET",null);  
    } catch (error) {
        console.error("Error al cargar automovil:", error);
        throw error;
    }
}

export async function saveCar(car) {
    try {
        return await request(BASE_ENDPOINT, "POST",car);  
    } catch (error) {
        console.error("Error al guardar el automovil:", error);
        throw error;
    }
}

export async function sellCar(id, customer) {
    try{
        return await request(`${BASE_ENDPOINT}/sell/${id}`, "PUT", customer);
    }catch(error){
        console.error("Error al realizar la venta");
        throw error;
    }
}

export async function updateCar(id,car) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "PUT",car);  
    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        throw error;
    }
}

export async function deleteCar(id) {
    try {
        return await request(`${BASE_ENDPOINT}/${id}`, "DELETE",null);  
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        throw error;
    }
}