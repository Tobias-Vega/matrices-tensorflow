import express from 'express';

const app = express();

app.use(express.static('public'));

const PORT = 4600;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
