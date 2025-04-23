const form = document.getElementById("form");

const matriz1Fila = document.getElementById("m1-f");
const matriz1Columna = document.getElementById("m1-c");
const matriz2Fila = document.getElementById("m2-f");
const matriz2Columna = document.getElementById("m2-c");

const contenedor = document.querySelector('.contenedor');
const matriz1Div = document.querySelector('.matriz-1-values');
const matriz2Div = document.querySelector('.matriz-2-values');
const resultadoEl = document.querySelector('.resultado');

const inputs = [matriz1Fila, matriz1Columna, matriz2Fila, matriz2Columna];

const validarInputs = () => {
  const valores = inputs.map(el => Number(el.value));

  if (valores.some(valor => !valor)) {
    alert("Todos los inputs son obligatorios");
    return null;
  }

  if (matriz1Columna.value !== matriz2Fila.value) {
    alert("El número de columnas de la primera matriz debe ser igual al número de filas de la segunda.");
    return null;
  }

  return valores;
}

const generarMatrizAleatoria = (filas, columnas) => {
  return tf.randomUniform([filas, columnas], 1, 21, 'int32');
}

const mostrarMatriz = (matriz, div) => {
  div.innerHTML = "";
  matriz.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.style.display = "flex";

    fila.forEach(valor => {
      const celda = document.createElement("div");
      celda.textContent = valor;
      celda.style.border = "1px solid black";
      celda.style.padding = "10px";
      celda.style.margin = "2px";
      celda.style.width = "40px";
      celda.style.textAlign = "center";
      celda.style.fontWeight = "bold";

      filaDiv.appendChild(celda);
    });

    div.appendChild(filaDiv);
  });
};

const mostrarResultado = (resultado) => {
  resultadoEl.innerHTML = "";

  resultado.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.style.display = "flex";

    fila.forEach(valor => {
      const celda = document.createElement("div");
      celda.textContent = valor;
      celda.style.border = "1px solid black";
      celda.style.padding = "10px";
      celda.style.margin = "2px";
      celda.style.width = "40px";
      celda.style.textAlign = "center";
      celda.style.fontWeight = "bold";

      filaDiv.appendChild(celda);
    });

    resultadoEl.appendChild(filaDiv);
  });
};

const generarMatriz = (filas1, columnas1, filas2, columnas2) => {
  const matriz1 = generarMatrizAleatoria(filas1, columnas1);
  const matriz2 = generarMatrizAleatoria(filas2, columnas2);

  matriz1.array().then(arr => {
    mostrarMatriz(arr, matriz1Div);
  });

  matriz2.array().then(arr => {
    mostrarMatriz(arr, matriz2Div);
  });

  const resultadoMultiplicacion = tf.matMul(matriz1, matriz2);

  resultadoMultiplicacion.array().then(arr => {
    mostrarResultado(arr);
  }).catch(error => console.log(error));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = validarInputs();

  if (!datos) return;

  generarMatriz(datos[0], datos[1], datos[2], datos[3]);
});
