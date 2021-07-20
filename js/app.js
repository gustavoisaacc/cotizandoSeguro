//constructor prototyper

function Seguro (marca, year, tipo){
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function (){

  /*
  1 = Americano 1.15
  2 = Aciatico 1.05
  3 = Europeo 1.35
  */

  let cantidad;
  let base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
  
    default:
      break;
  }

  let diferencia = new Date().getFullYear() - this.year;
  cantidad -= ((diferencia * 3) * cantidad) / 100; 
  /*
  basico = 1.30
  completo = 1.50
   */
  if(this.tipo === 'basico'){
    cantidad *= 1.30;
  }else{
    cantidad *= 1.50
  }

  return cantidad;
}

function UI (){}

//igresamos los años 
UI.prototype.llenarOpciones = ()=> {
  const max = new Date().getFullYear();
  const min = max - 20;

  const year = document.querySelector('#year');

  for(let i = max; i >= min; --i){
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;

    year.appendChild(option);
  }

}


//mostramos mensaje de error
UI.prototype.mostrarMensaje = (mensaje, tipo)=>{

  const div = document.createElement('div');
  
  if(tipo === 'error'){
    div.classList.add('error');
  }else{
    div.classList.add('correcto');
  }

  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;

  ///insertar msj
  const resultado = document.querySelector('#resultado');
  const formulario = document.querySelector('#cotizar-seguro');

  formulario.insertBefore(div, resultado);

  setTimeout(()=>{
    div.remove();
  }, 3000);

}

UI.prototype.mostrarResultado = (total,seguro)=>{
  let textMarca
  switch (seguro.marca) {
    case '1':
      textMarca = 'Americano'      
      break;
    case '2':
      textMarca = 'Asiatico'      
      break;
    case '3':
      textMarca = 'Eurpeo'      
      break;
  
    default:
      break;
  }


  const div = document.createElement('div');
  div.classList.add('mt-10');

  div.innerHTML = `
  <p class="header">Tu Resultado</p>
  <p class="font-bold">Marca: <spam class="font-normal">${textMarca}</spam></p>
  <p class="font-bold">Año: <span class="font-normal">${seguro.year}</span></p>
  <p class="font-bold">Seguro: <span class="font-normal capitalize">${seguro.tipo}</span></p>
  <p class="font-bold">Total: $ ${total}</p>
  `
  const resultado = document.querySelector('#resultado');

  //mostrar el espiner
  const spinner = document.querySelector('#cargando')
  spinner.style.display = 'block';

  setTimeout(()=>{
    spinner.style.display = 'none';
    resultado.appendChild(div)

  },3000)

}

const ui = new UI();

//CUANDO EL DOCUMENTO ESTA LISTO
document.addEventListener('DOMContentLoaded', ()=> {
  ui.llenarOpciones()//LLENAMOS EL IMPUT DE LOS AÑOS
});

eventListener();
function eventListener (){
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizandoSeguto);
}

function cotizandoSeguto (e){
  e.preventDefault();
  //marca
  const marca = document.querySelector('#marca').value;
  //año
  const year = document.querySelector('#year').value;
  //tipo
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
 
  if(marca === "" || year === "" || tipo === ""){
    ui.mostrarMensaje('Todos los capos son obligatorios', 'error');
    return ;
  }
  ui.mostrarMensaje('Cotizando...', 'exito');

  //ocultar las notificaciones previas
  const resultado = document.querySelector('#resultado div');
  if(resultado != null){
    resultado.remove();
  }


  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();
  ui.mostrarResultado(total, seguro)
  
}