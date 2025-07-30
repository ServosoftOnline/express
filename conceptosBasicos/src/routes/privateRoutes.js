// RUTAS PROTEGIDAS

// Importo express y almaceno el modulo router en la cte router
import express from 'express'
const router = express.Router()

// Al entrar en la ruta http://localhost:3000/private/dashboard?login=erbaranda@gmail.com devuelve un mensaje
router.get('/private/dashboard', (req, res) => {
    res.send('Dashboard page')
})

// Desde thunder client acceder a la ruta: http://localhost:3000/private/products?login=erbaranda@gmail.com mediante post
router.post('/private/products', (req, res) => {
    res.send('Creando productos')
})

// La ruta sería la misma pero usando el método put
router.put('/private/products', (req, res) => {
    res.send('Actualizando un producto')
})

// La ruta sería la misma pero usando el método delete
router.delete('/private/products', (req, res) => {
    res.send('Eliminando un producto')
})

// La ruta sería la misma pero usando el método patch
router.patch('/private/products', (req, res) => {
    res.send('Actualizando un dato de un producto')
})

// Exporto las rutas
export default router
