const default_url = "http://localhost:3001/api";

const ApiService2 = {
    get: async (resource, token) => {
        const request = {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };

        const api_response = await fetch(`${default_url}/${resource}`, request);

        const response = { code: api_response.status, data: null };
        if (api_response.ok) response.data = await api_response.json();

        return response;
    },

    post: async (resource, data, content_type, token) => {
        const request = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };

        // Si el data es FormData, no especificamos `Content-Type`
        if (data instanceof FormData) {
            request.body = data;
        } else {
            request.body = JSON.stringify(data);
            request.headers["Content-Type"] = content_type;
        }

        const api_response = await fetch(`${default_url}/${resource}`, request);

        const response = { code: api_response.status, data: null };
        if (api_response.ok) response.data = await api_response.json();

        return response;
    },

    put: async (resource, data, content_type, token) => {
        const request = {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        };

        // Si el data es FormData, no especificamos `Content-Type`
        if (data instanceof FormData) {
            request.body = data;
        } else {
            request.body = JSON.stringify(data);
            request.headers["Content-Type"] = content_type;
        }

        const api_response = await fetch(`${default_url}/${resource}`, request);

        const response = { code: api_response.status, data: null };
        if (api_response.ok) response.data = await api_response.json();

        return response;
    },
};

export default ApiService2;
