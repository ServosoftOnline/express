/*
    Este script crea un servidor mediante mediante express:

        - Así se habría creado el servidor web si hubiera usado el modulo http de commonjs:

            const http = require('http')
            const fs = require('fs')

            const server = http.createServer((req, res) => {
                const read = fs.createReadStream('./static/index.html')
                read.pipe(res)
            }

            server.listen(3000)
            console.log('Servidor escuchando en el puerto 3000')

        - Todo el código que usa este script se encuentra detallado en el archivo express.txt        
        - Usar express en su lugar hace más facil añadir rutas(Tambien llamado routing)

        - El servidor está extructurado en rutas públicas y privadas:

            - Las rutas públicas son accesibles por todos los usuarios
            - Las rutas privadas solo son accesibles por usuarios registrados cuyo login sea erbaranda@gmail.com
            - Usaré los diferentes metodos de comunicacion get, post, put, delete y patch, all

        - Existen middlewares intercalados entres las rutas públicas y privadas
            
            - Un primer middleware que muestra la ruta y el método utilizado (loggins)

            - Rutas públicas que no necesitan autorización divididas en:

                - Ejemplos de rutas básicas para entender el funcionamiento de express
                    - Rutas que devuelven archivos, textos, json, imagenes, codigos de estado

                - Rutas que reciben diferentes datos desde el cliente y los muestran en consola. Concepto request body
                - Rutas que reciben parámetros y los trato. Concepto request params
                - Rutas que reciben variables. Concepto request query                

            - Declaro la carpeta public como publica mediante el middleware de express static
            - Un segundo middleware que comprueba si se ha recibido una ruta publica que no exista
            - Un tercer middleware que comprueba si la ruta es privada
                - Establezco que las rutas privadas deben empezar por /private.

            - Un cuarto middleware que comprueba si el usuario está autorizado para acceder a las rutas privadas
                - Usando para ello el concepto de request query. Debo pasarle el login con el valor erbaranda@gmail.com
                - Mostrará en consola si el usuario está autorizado o no lo esta

            - Rutas privadas que solo serán accesibles si pasaron el l tercer y cuarto middleware
            - Un quinto middleware que comprueba si se ha recibido una ruta privada que no exista

        - Acabo el script con la indicación del puerto donde escucha la aplicación y lo muestro en consola

*/

// SERVIDOR CREADO MEDIANTE EXPRESS

// Importo express, llamo a la función express y almaceno el resultado en la constante app
import express from 'express'
const app = express()

// Importo el modulo path
import path from 'path'

// Importo la utilidad que simula el objeto global __dirname que lo perdí al usar ESM
import { __dirname } from './utils/dirname.js'

// Diferentes middlewares que usaran en las rutas
app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Importo las rutas publicas
import publicRoutes from './routes/publicRoutes.js'
import requestBodyRoutes from './routes/requestBodyRoutes.js'
import requestParamsRoutes from './routes/requestParamsRoutes.js'
import requestQueryRoutes from './routes/requestQueryRoutes.js'

// Importo las rutas privadas
import privateRoutes from './routes/privateRoutes.js'

// Settings: Activo el case sensitive de las rutas, Nombre de la aplicacion, puerto de escucha.
app.set('case sensitive routing', true)
app.set('appName', 'Practice server')
app.set('port', 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware que muestra la ruta y el metodo utilizado (logger)
app.use((req, res, next) => {
    console.log(`Ruta accedida: ${req.url} con el método ${req.method}`)
    next()
})

// Servir archivos estáticos desde la carpeta actual. Carpeta raiz del proyectO.
// Tuve que añadirla para poder cargar los estilos
app.use(express.static(path.join(__dirname)));

// Llamo a las rutas publicas
app.use(publicRoutes)
app.use(requestBodyRoutes)
app.use(requestParamsRoutes)
app.use(requestQueryRoutes)

// Declaro publicas la carpeta public
app.use("/public", express.static(path.join(__dirname, '/public')))

// Middleware para el manoejo de las rutas publicas no encontradas. Las rutas hacia paginas privadas empezarán por /private
app.use((req, res, next) => {
    if (!req.url.startsWith('/private')) {
        return res.status(404).send('Página pública no encontrada');
    }
    next();
});

/*
    Middleware para comprobar la autorización de acceso a las rutas privadas
    Solo accederán aquellas rutas que añadan la vble login con el valor erbaranda@gmail.com y que empiecen por /private
*/

app.use((req, res, next) => {
    console.log('Comprobando acceso ...')
    if(req.query.login === 'erbaranda@gmail.com') {
        console.log('Usuario autorizado')
        next()
    }
    else {
        console.log('Usuario no autorizado')
        res.send('Usuario no autorizado')
    }
})

// LLamo a las rutas privadas
app.use(privateRoutes)

// Llegado esta momento ha recorrido todas las rutas privadas y no ha encontrado ninguna
app.use((req, res) => {
    res.send('Pagina privada no encontrada')
    //res.status(404).send('Pagina no encontrada')
})

// Indico el puerto donde escucha la aplicacción y lo muestro en consola
app.listen(app.get('port'))
console.log(`${app.get('appName')} on port ${app.get('port')} `)
