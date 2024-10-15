const default_url = "http://localhost:3001/api";

const ApiService = {
    get: async (resource) => {
        const response = await fetch(`${default_url}/${resource}`);

        console.log(`POST: ${response.status}, ${response.statusText}`);

        if (!response.ok) return;
        
        return await response.json();
    },

    post: async (resource, data) => {
        const response = await fetch(`${default_url}/${resource}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(`POST: ${response.status}, ${response.statusText}`);

        if (!response.ok) return;
        
        return await response.json();
    },
}

export default ApiService;
