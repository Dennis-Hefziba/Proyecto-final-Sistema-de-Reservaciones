const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//para inicializar los roles una vez se inicie la app
const {createRoles} = require('./helpers/initialSetupRoles');


const app = express();
createRoles(); //llamamos a la funcion para crear los usuarios

dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://dennishefziba20:trfLx01Y0PSEnx0B@bookings.2cuebpg.mongodb.net/';

mongoose.connect(mongoURI).then(() => {
    console.log('MongoDB conected');
}).catch((err) => {
    console.log(console.log(err));
});

//importamos las rutas de los endpoints
const routeBookings = require('./routes/Bookings');
app.use('/api/booking', routeBookings);

//importamos las rutas de endpoints de los usuarios
const routeAuths = require('./routes/auth');
app.use('/api/auth', routeAuths);

app.listen(port, () => {
    console.log('App running on port '+port);
})