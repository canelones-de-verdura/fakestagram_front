const default_url = "http://localhost:3001/api";

const ApiService = {
    get: async (resource, token) => {
        const request = {
            headers: {
                "Authorization": `Bearer: ${token}`,
                // Para los GET que no necesitan token, como el login, no pasa nada si mandamos un undefined
            },
        };

        const api_response = await fetch(`${default_url}/${resource}`, request);

        console.log(`POST: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();

        return response;
    },

    post: async (resource, data, content_type, token) => {
        const request = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer: ${token}`,
                "Content-Type": `${content_type}`,
            },
        };

        const api_response = await fetch(`${default_url}/${resource}`, request);

        console.log(`POST: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();

        return response;
    },
}

export default ApiService;
