const default_url = "http://localhost:3001/api";

const ApiService = {
    get: async (resource) => {
        const api_response = await fetch(`${default_url}/${resource}`);

        console.log(`POST: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();
        
        return response;
    },

    post: async (resource, data) => {
        const api_response = await fetch(`${default_url}/${resource}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(`POST: ${api_response.status}, ${api_response.statusText}`);

        const response = { code: api_response.status, data: null };

        if (api_response.ok)
            response.data = await api_response.json();
        
        return response;
    },
}

export default ApiService;
