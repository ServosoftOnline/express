/*
    REST API

    - REST: Representational State Transfer.
        -Conjunto de recomendaciones para crear servicios web

    - API: Application Programming Interface
        - El servidor es una aplicacion intermediaria entre el cliente y la base de datos

    - Este servidor es una API que cumple las recomendaciones REST

        - Hará un CRUD sobre un array llamado productos
        - En situaciones reales los productos tendrían que ser almacenados en una BBDD o en un archivo    
        - Permitirá crear, leer, actualizar y eliminar productos de ese array
        - Para ello se usarán diferentes métodos o verbos html        
        - Desde el front se enviarían json y el servidor le respondería tambien con json
        - Las pruebas serán realizadas mediante thunder client

    - Instalacion:

        - npm init -y, que generará el package.json
        - npm i express, que instalará el framework
        - npm i morgan, que instalará un middleware para mostrar mensajes en la consola

        - npm i nodemon -D, que instalará una herramienta para reiniciar el servidor automáticamente
            - Crear un script en package.json para ejecutar nodemon
            - "dev": "nodemon server.js"
            - Lo ejecutaré con npm run dev en consola

*/

// Importo express y creo la app
const express = require('express')
const app = express()

// Importo morgan y lo uso como loggers
const morgan = require('morgan')
app.use(morgan('dev'))

// Middleware para que express pueda entender json
app.use(express.json())

// Array de productos iniciado con el primer producto
let products = [
    {
        "id": 1,
        "name": "producto1",
        "price": 100
    }
]

// Inicio del routing

// Doy la bienvenida al servidor
app.all('/', (req, res) => {
    res.send('Bienvenido a este servidor que realiza un CRUD sobre un array')
})

//  Muestra el contenido del array products.
app.get('/products', (req, res) => {    
    res.json(products)
})

// Añade un producto, crea el id y devuelve el producto en json. Desde el front envio nombre y precio.
app.post('/products', (req, res) => {

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }

    products.push(newProduct)
    res.json(newProduct)
})

// Localizo un producto. Si no lo encuentro devuelvo un json indicandolo y si lo encuentro lo respondo
app.get('/products/:id', (req, res) => {
    
    const productFound = products.find((product) => product.id === parseInt(req.params.id))

    if (!productFound) {
        console.log('Product not found')
        res.status(404).json({"message": "Product not found"})
    } else {
        console.log(productFound)
        res.json(productFound)
    }
    
})

/* Actualizo un producto. Busco el producto, añado los nuevos datos a partir del request body. Si no encontré el producto devuelvo el json que así lo indica. Si lo encuentro reemplazo el array producto con los nuevos datos y devuelvo que json que que actualizé el producto */

app.put('/products/:id', (req, res) => {

    const productFound = products.find((product) => product.id === parseInt(req.params.id))
    const newData = req.body

    if (!productFound) {        
        console.log('Product not found')
        res.status(404).json({"message": "Product not found"})
    } else {
        products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)        
        res.json({"message": "Updated product"})
    }
    
})

/* Elimino un producto: Lo busco, si no lo encuentro devuelvo el json indicando que no lo encontre. Si lo encuentro actualizo el array de productos existentes con todos los productos excepto el que encontré y respondo que fue todo bien y que no devuelvo ningun dato */

app.delete('/products/:id', (req, res) => {
    const productFound = products.find((product) => product.id === parseInt(req.params.id))

    if (!productFound) {
        console.log('Product not found')
        res.status(404).json({"message": "Product not found"})
    } else {
        products = products.filter((product) => product.id !== parseInt(req.params.id))
        res.sendStatus(204)
    }
    
})

// Fin del routing

// LLegado a este momento aplico el middleware que indica que la pagina no ha sido encontrada y el estado 404
app.use((req, res) => {
    res.status(404).send('Page not found. Error: 404')
})

// Indico el puerto de escucha y que lo muestre en consola
app.listen(3000, () => {
    console.log('Server on port 3000')
})