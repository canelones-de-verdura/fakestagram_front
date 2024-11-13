import ApiService2 from "./ApiService2";

const MyProfileService = {
    postImage: async (caption, image, token) => {
        // Crear FormData y agregar el archivo y el caption
        const formData = new FormData();
        formData.append("caption", caption);//Asi se agrega los parametros en form data (a diferencia de json)
        formData.append("image", image);

        // Llamar a ApiService.post con el FormData
        const response = await ApiService2.post(
            "posts/upload", 
            formData,
            null, // No se necesita `Content-Type` aquí
            token // Esto es para acceder a la ruta validadada con el token
        );
        console.log("EL POST ES (asi llega la imagen al post): "+image);

        return response;
    },

    editProfile: async(userName, trueName, bio, token) => {
        const updateUser = {
            username: userName,
            description:bio,
            name: trueName,
        }

        const response = await ApiService2.put("user/profile/edit", updateUser, "application/json", token);
        return response;
    },

    editImageProfile: async (profilePicture, token) =>{
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);

        const response = await ApiService2.put("user/profile/edit", formData, "application/json", token);
        console.log("Asi llega la Imagen al servicio: "+profilePicture);
        console.log(response);
        return response;
    }


};

export default MyProfileService;
