const BASE_URL = 'http://localhost:8080/automoviles';


export const request = async (endpoint, method, body = null) => {
    try {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        };

        if (body && method !== "GET" && method !== "HEAD") {
            options.body = JSON.stringify(body);
            console.log(JSON.stringify(body))
        }
        
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error;
    }
};

export const requestCredentials = async (user ) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        }
        
        const response = await fetch(`${BASE_URL}/auth`, options);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error;
    }
};

