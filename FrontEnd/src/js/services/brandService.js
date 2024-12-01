const BASE_URL = 'http://localhost:8080/automoviles';

export const request = async (endpoint, method) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        });

        if (!response.ok) {
            // Manejo de errores basado en el código de estado HTTP
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Procesar el cuerpo de la respuesta como JSON
        const json = await response.json();

        // Devuelve los datos extraídos
        return json.data; // Asegúrate de que 'data' existe en el objeto devuelto por la API
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error; // Relanza el error para manejarlo donde se llame la función
    }
};


const BASE_ENDPOINT = '/brand';

export async function findAllBrands() {
    try {
        return await request(BASE_ENDPOINT, "GET");  
    } catch (error) {
        console.error("Error al cargar las marcas:", error);
        throw error;
    }
}
