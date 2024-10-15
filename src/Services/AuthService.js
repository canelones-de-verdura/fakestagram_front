import ApiService from "./ApiService";

const AuthService = {
    register: async (username, email, passwd) => {
        const creds = {
            username: username,
            email: email,
            password: passwd,
        };

        const user = await ApiService.post("auth/register", creds);

        return user;
    },

    login: async (email, passwd) => {
        const creds = {
            email: email,
            password: passwd,
        };

        const user = await ApiService.post("auth/login", creds);
        
        return user;
    }
}

export default AuthService;
