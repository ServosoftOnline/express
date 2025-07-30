// INICIO DE LAS PRUEBAS QUERY. Véase mas detalles en express.txt

// Importo express y almaceno el modulo router en la cte router
// const express = require('express')
import express from 'express'
const router = express.Router()

/* 
    PRUEBA1: Enviar la edad y la fecha de cumpleaños mediante query
    - La url seria: http://localhost:3000/vble/?edad=50&cumpleanos=25 de abril de 1975.
    - Los espacios serán remplazados por %
    - Muestra por consola el objeto que contiene ambas variables y mostrarlas en el navegador
*/
router.get('/vble/', (req, res) => {    
    console.log(req.query)
    res.send(`Mi edad es: ${req.query.edad} años, nací el ${req.query.cumpleanos}`)    
})

/*
    PRUEBA 2: Devuelve los libros de javascript solo si se le indica mediante una query
    - Url: http://localhost:3000/search?q=Libros%20de%20javascript devolvería la paginas de libros de javascript
    - En caso contraria devolvería una página normal

*/
router.get('/search', (req, res) => {
    if(req.query.q === 'Libros de javascript') res.send('Lista de libros de javascript')        
    else res.send('Pagina normal')    
})

/*
    PRUEBA 4: Enviar desde el cliente dos datos en una sola variable
    - La url: http://localhost:3000/combinado?user=jesus&user=oscar sería recibida por el servidor como un objeto
    - Su propiedad seria user y su valor seria un array formado por dos strings jesus y oscar
*/
router.get('/combinado', (req, res) => {
    console.log(req.query)
    res.send('Ha recibido un objeto con la propiedad user y su valor es un array con los valores jesus y oscar')
})

// Exporto las rutas
export default router