function validate(form) {
    const error = {};
    if (form.title.length < 5) {
      error.title = "¡Ingrese un name valido!";
    }
    if (!form.images) {
      error.images = "¡Inserte imagen!";
    }
    if (isNaN(form.price) === true || form.price < 1) {
      error.price = "¡Por favor ingresa un precio válido!";
    }
    if (isNaN(form.stock) === true || form.stock < 1) {
      error.stock = "¡Debe ser un numero mayor a 0!";
    }
    if (form.category === "" || form.brand === null) {
      error.category = "¡Por favor ingresa una category!";
    }
    if (form.summary.length < 10) {
      error.summary = "¡Por favor ingresa un resumen.!";
    }
    return error;
  }

  export default validate;