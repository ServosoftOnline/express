/*
    INICIO DE LAS PRUEBAS REQUEST PARAMS.
    Usando rutas dinámicas envio parametros desde el cliente que recibe el servidor. Véase en express.txt
*/

// Importo express y almaceno el modulo router en la cte router
import express from 'express'
const router = express.Router()

// Importo el modulo path
import path from 'path'

// Importo la utilidad que simula el objeto global __dirname que lo perdí al usar ESM
import { __dirname } from './../utils/dirname.js'

/* 
    PRUEBA 1: Recibo un parametro que siempre es un string.
    Muestro en consola el objeto completo con el parámetro recibido.
    El valor que coincide con el parámetro lo maso a mayusculas
    Muestro un mensaje en el navegador con el parámetro recibido y el tipo de dato que es
    Para probarlo hay que introducir en el navegador la url http://localhost:3000/user/elIdQueQuieraEnviar
*/

router.get('/user/:id', (req, res) => {
    console.log(req.params) 
    console.log(`Lo paso a mayusculas: ${req.params.id.toUpperCase()}`)     
    res.send(`Recibido el parametro: ${req.params.id} de tipo: ${typeof req.params.id}` )
})

/*
    PRUEBA 2: Recibo dos parametros y devuelvo su suma. Pero extrallendo los parametros de req.params
    La url seria por ejemplo http://localhost:3000/suma/1/4 Respondería un texto con: El resultado de su suma es: 5
*/
router.get('/suma/:num1/:num2', (req, res) => {
    const {num1, num2} = req.params
    res.send(`El resultado de su suma es: ${parseInt(num1) + parseInt(num2)}`)
})

/*
    PRUEBA 3: Devuelve una imagen solo si el usuario es baranda
    La url http://localhost:3000/imagen/baranda/photo devuelve una imagen.
    La url http://localhost:3000/imagen/baranda/photo2 devuelve pagina no encontrada.
    La url http://localhost:3000/imagen/baranda2/photo devolvería Usuario incorrecto
    
*/
router.get('/imagen/:usuario/photo', (req, res) => {
    const {usuario} = req.params
    if(usuario === 'baranda') res.sendFile(path.join(__dirname, '../','./assets/logo.png'))
    else res.send('Usuario incorrecto')
}) 

/*
    PRUEBA 4: Enviamos el nombre y la edad de un usuario y devolvemos un mensaje con el nombre y la edad
    El orden con el que extraigo los parámetros no importa. Extraigo primero la edad y despues el nombre
    La ruta: http://localhost:3000/usuario/oscar/edad/49 responderá un texto con Bienvenido oscar, tienes 49 años
*/
router.get('/usuario/:nombre/edad/:edad', (req, res) => {
    const {edad, nombre} = req.params
    res.send(`Bienvenido ${nombre}, tienes ${edad} años`)
})

// Exporto las rutas
export default router