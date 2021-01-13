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

if (process.env.NODE_ENV === 'dev'){
    urlDB = "mongodb+srv://test1:test1@cluster0.zwjcs.mongodb.net/infinity";
   
}else {
    urlDB = "mongodb+srv://test1:test1@cluster0.zwjcs.mongodb.net/infinity";
             
}

process.env.URLDB = urlDB;