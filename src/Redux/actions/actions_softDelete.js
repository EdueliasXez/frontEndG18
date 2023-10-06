import axios from 'axios';


export const handleActive = async (model, id, isActive) => {
    try {

      await axios.put(`/softdelete/activate`, { model, id, activateValue: isActive });

      return { success: true };
    } catch (error) {
        console.log('Error al cambiar es estado de activo')
      throw error;
    }
  };
  

export const handleActiveEvent = async (eventId, isActive) => {
    try {
      await handleActive('event', eventId, isActive);
    } catch (error) {
      console.error('Error al cambiar el estado del evento:', error);
    }
  };

export const handleActiveUser = async (userId, isActive) => {
    try {
      await handleActive('User', userId, isActive);
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

export const handleActiveReview = async (reviewId, isActive) => {
    try {
      await handleActive('Reviews', reviewId, isActive);
    } catch (error) {
      console.error('Error al cambiar el estado de la revisión:', error);
    }
  };