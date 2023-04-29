new FinisherHeader({
  "count": 100,
  "size": {
    "min": 2,
    "max": 8,
    "pulse": 0
  },
  "speed": {
    "x": {
      "min": 0,
      "max": 0.4
    },
    "y": {
      "min": 0,
      "max": 0.6
    }
  },
  "colors": {
    "background": "#201e30",
    "particles": [
      "#fbfcca",
      "#d7f3fe",
      "#ffd0a7"
    ]
  },
  "blending": "overlay",
  "opacity": {
    "center": 1,
    "edge": 0
  },
  "skew": 0,
  "shapes": [
    "c"
  ]
});
  var modelo = null;
  //Cargamos el modelo entrenado
  (async() =>{
      console.log("Cargando el modelo...");
      modelo = await tf.loadLayersModel("model.json");
      console.log("Modelo cargado!");
  })();

  const btn = document.getElementById("btn");

  btn.onclick = () =>{
      var ciudad = document.getElementById('ciudad').value;
      var ban  = document.getElementById('ban').value;
      var m2 = document.getElementById('m2').value;
      var hab = document.getElementById('hab').value;
      var planta = document.getElementById('planta').value;
      var ascensor = document.getElementById('ascensor').value;
      var ext = document.getElementById('ext').value;
      var amb = document.getElementById('amb').value;
      var cent = document.getElementById('cent').value;
      var verde = document.getElementById('verde').value;
      var gim = document.getElementById('gimnasio').value;
      var park = document.getElementById('parqueo').value;
      var pisc = document.getElementById('piscina').value;
      var sec =  document.getElementById('seguridad').value
      
      
      if(modelo != null){
          var tensor = tf.tensor2d([[parseInt(ciudad), parseInt(m2), parseInt(hab), parseFloat(ban),parseInt(planta), parseInt(ascensor), parseInt(ext), parseInt(amb), parseInt(cent),parseInt(verde),parseInt(gim),parseInt(park),parseInt(pisc),parseInt(sec)]]);
          var prediccion = modelo.predict(tensor).dataSync();
          prediccion = Math.round(prediccion, 2)
          document.getElementById("resultado").innerHTML = prediccion + " por mes.";
      }else{
          document.getElementById("resultado").innerHTML = "Error.";
      }
  }

function reiniciarFormulario() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: '¿Quiere reiniciar el calculo?',
    text: "Esta acción restablecerá el formulario!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, reiniciar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("m2").value = "";
      document.getElementById("hab").value = "";
      document.getElementById("ban").value = "";
      document.getElementById("planta").value = "";
      document.getElementById("parqueo").value = "";
      document.getElementById("ascensor").selectedIndex = 0;
      document.getElementById("ext").selectedIndex = 0;
      document.getElementById("amb").selectedIndex = 0;
      document.getElementById("cent").selectedIndex = 0;
      document.getElementById("verde").selectedIndex = 0;
      document.getElementById("gimnasio").selectedIndex = 0;
      document.getElementById("piscina").selectedIndex = 0;
      document.getElementById("seguridad").selectedIndex = 0;
      document.getElementById("ciudad").selectedIndex = 0;
      document.getElementById("resultado").innerHTML = "";
      
      swalWithBootstrapButtons.fire(
        'Reiniciado!',
        'El formulario ha sido reiniciado.',
        'success'
      )
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'El formulario no ha sido reiniciado.',
        'error'
      )
    }
  });
}
  
function validarNumero(idCampo) {
  var campo = document.getElementById(idCampo);
  var mensajeError = document.getElementById("mensaje-error-" + idCampo);
  if (campo.value <= 0) {
    mensajeError.style.display = "inline";
    campo.value = 0;
  } else {
    mensajeError.style.display = "none";
  }
}