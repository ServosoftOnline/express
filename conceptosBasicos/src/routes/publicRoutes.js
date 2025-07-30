// RUTAS PUBLICAS

// Importo express y almaceno el modulo router en la cte router
import express from 'express'
const router = express.Router()

// Importo el módulo path
import path from 'path'

// Importo la utilidad que simula el objeto global __dirname que lo perdí al usar ESM
import { __dirname } from './../utils/dirname.js'

// Al entrar en la ruta raiz devuelvo el archivo index.html situado en dos carpetas superiores al directorio actual
router.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, '../', '../', '/public/index.html'));
})

// renderizo una pagina usando ejs
router.get('/about', (req, res) => {
    res.render('about')

})

/*
    Como acceder a los archivos note.txt privado o publico:
    La ruta: http://localhost:3000/public/uploads/note.txt accedería al archivo publico
    La ruta: http://localhost:3000/note.txt accedería al archivo privado
*/

// Al entrar en esta ruta devuelve este esto
router.get('/note.txt', (req, res) => {
    res.send('Esto es una ruta. No el archivo publico note.txt situado en la carpeta publica dist')
})

// Al entrar en la ruta /about devuelvo el texto 'Lista de productos usando el método get
router.get('/products', (req, res) => {

    // Antes de devolver la respuesta haría operaciones con la base de datos: Validaciones, consultas, etc
    res.send('Lista de productos')
})

// Accedo a esta ruta tanto desde el navegador como desde thunder client
router.all('/info', (req, res) => {
    res.send('Server info')
})

// Al entrar en la ruta /miarchivo devuelvo una imagen con un logo
router.get('/miarchivo', (req, res) => res.sendFile(path.join(__dirname, '../','./assets/logo.png')))

// Al entrar en la ruta usuario devuelvo un objeto JSON con un nombre y un apellido
router.get('/usuario', (req, res) => {
    res.json({
        nombre: 'Juan',
        apellido: 'Perez',
        edad: 30,
        comidasPreferidas: ['Pizza', 'Hamburguesa', 'Ensalada']
    })
})

// Al entrar en la ruta /isAlive devuelve el codigo de estado 204 indicando que esta todo bien y que no devuelve contenido. El navegador lo transformará en un estado 304 indicando que no ha cambiado el contenido
router.get('/isAlive', (req, res) =>res.sendStatus(204))

// Exporto las rutas
export default router
