// ===========================================
//  Puerto
// ===========================================
process.env.PORT = process.env.PORT || 3001;

// ===========================================
//  Entorno
// ===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev000';

// ===========================================
//  Base de datos
// ===========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/prueba';
} else {
    urlDB = process.env.MONGO_URI

process.env.URLDB = urlDB;


//=======================================
//
process.env.CADUCIDAD_TOKEN = 60*60*24*30;


process.env.SEED = process.env.SEED || 'este-es-la-clave-en-dev'