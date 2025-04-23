const form = document.getElementById("form");

const matriz1Fila = document.getElementById("m1-f");
const matriz1Columna = document.getElementById("m1-c");

const resultadoEl = document.querySelector('.resultado');

const validarInputs = () => {
  const f1 = Number(matriz1Fila.value);
  const c1 = Number(matriz1Columna.value);

  if (!f1 || !c1) {
    alert("Todos los inputs son obligatorios");
    return null;
  }

  return [f1, c1];
};


const mostrarResultado = (titulo, matriz) => {
  const contenedor = document.createElement("div");
  contenedor.innerHTML = `<h3>${titulo}</h3>`;
  matriz.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.classList.add("resultado-matrices");
    fila.forEach(valor => {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.textContent = valor;
      filaDiv.appendChild(celda);
    });
    contenedor.appendChild(filaDiv);
  });
  resultadoEl.appendChild(contenedor);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultadoEl.innerHTML = "";

  const dimensiones = validarInputs();
  if (!dimensiones) return;

  const [filas, columnas] = dimensiones;


  const matriz1 = tf.randomUniform([filas, columnas], 1, 21, 'int32');
  const matriz2 = tf.randomUniform([filas, columnas], 1, 21, 'int32');

  const suma = tf.add(matriz1, matriz2);

  const [arr1, arr2, sumaArr] = await Promise.all([
    matriz1.array(), matriz2.array(), suma.array()
  ]);

  mostrarResultado("Matriz 1", arr1);
  mostrarResultado("Matriz 2", arr2);
  mostrarResultado("Suma", sumaArr);
});
