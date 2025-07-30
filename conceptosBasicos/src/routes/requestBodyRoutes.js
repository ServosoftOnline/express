/*
    INICIO DE LAS PRUEBAS REQUEST BODY. SIMULACION DE PETICIONES POST DESDE EL CLIENTE PASANDOLE DATOS AL SERVIDOR
    Para probarlo hay que seguir los pasos descritos en el archivo express.txt y usar la extension thunder client:
    Desde la extension indico el método post, la url se corresponderia con el endpoint. En el body indico el tipo de datos que envio y en el recuadro de abajo introduzco los datos que quiero enviar
*/

// Importo express y almaceno el modulo router en la cte router
// const express = require('express')
import express from 'express'
const router = express.Router()

// PRUEBA 1: Recibo un texto, lo muestro en consola y devuelvo un texto "Usuario creado"
router.post('/user', (req, res) => {    
    console.log(req.body)
    res.send('Usuario creado')
})

// PRUEBA 2: Recibo un json con los datos personales de un cliente. 
router.post('/userInfo', (req, res) => {    
    console.log(req.body)
    res.send('Añadido datos personales a la BBDD')
})

// PRUEBA 3: Recibo información desde un formulario.
router.post('/formulario', (req, res) => {    
    console.log(req.body)
    res.send('Recibido los datos desde el formulario')
})

// Exporto las rutas
export default router