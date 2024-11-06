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

        return response;
    }
};

export default MyProfileService;
