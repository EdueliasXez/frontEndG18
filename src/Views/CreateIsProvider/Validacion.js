// validate.js
const validacion = (form) => {
    const errors = {};
  
    if (form.title.trim().length < 5) {
      errors.title = "¡Ingrese un nombre válido!";
    }
  
    if (!form.images) {
      errors.images = "¡Inserte una imagen!";
    }
  
    if (isNaN(form.price) || form.price <= 0) {
      errors.price = "¡Por favor ingrese un precio válido!";
    }
  
    if (isNaN(form.stock) || form.stock <= 0) {
      errors.stock = "¡Debe ser un número mayor a 0!";
    }
  
    if (!form.categories) {
      errors.categories = "¡Por favor ingrese una categoría!";
    }
  
    if (form.summary.trim().length < 10) {
      errors.summary = "¡Por favor ingrese un resumen válido!";
    }
  
    return errors;
  };
  
  export default validacion;
  