import ApiService from "./ApiService";

const NotificationService = {
  // Obtener notificaciones para el usuario autenticado
  getUserNotifications: async (token) => {
    try {
      const response = await ApiService.get(`user/notifications`, token);
      return response.data;
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
      throw error;
    }
  },
};

export default NotificationService;