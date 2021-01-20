const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
/*
app.get("/usuario", function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
  
    let limite = req.query.limite || 5;
    limite = Number(limite);
  
    Usuario.find({estado:true}, 'nombre email role estado google img')
      .skip(desde)
      .limit(limite)
      .exec((err, usuarios) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
  
        Usuario.count({estado:true}, (err, conteo) => {
          res.json({
            ok: true,
            registros: conteo,
            usuarios
          });
        });
    });
  });

*/
app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.hasta || 10;
    hasta = Number(hasta);
/*
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
*/
    let soli = "";
    let fechaSoli = req.query.fecha || null;
    let horaSoli = req.query.hora || null;
    //fecha solicitada y hora solicitada en la peticion 
    if (fechaSoli === null && horaSoli === null) {
        soli = {
            //salida
        }
    }
    //fecha solicitada y hora solicitada en la peticion diferente de null
    if (fechaSoli != null && horaSoli != null) {
        soli = {
            //Respuesta con los campos de fecha y hora
            fecha: fechaSoli,
            hora: horaSoli
        }
    }
    //fecha solicitada diferente y hora igual
    if (fechaSoli != null && horaSoli === null) {
        soli = {
            //fecha solicitada en la peticion
            fecha: fechaSoli
        }
    }
    //hora solicitada diferente y fecha desigual
    if (horaSoli != null && fechaSoli === null) {
        soli = {
            hora: horaSoli
        }
    }


    Usuario.find(soli, 'caja fecha hora')
        .skip(desde)
        .limit(hasta)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count(soli, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})

app.post('/usuario', function(req, res) {
    let fecha = new Date()
    let body = req.body;
    let info = new Usuario({
        caja: body.caja,
        fecha: fecha.getDate() + "/" + fecha.getMonth() + 1 + "/" + fecha.getFullYear(),
        hora: fecha.getHours() + ":" + fecha.getMinutes()
    })
    info.save((err, cajaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                Usuario: cajaDB
            })
        }

    })
})



app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, regCajaEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (regCajaEliminado === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Este registro no existe '
                }
            })
        }
        res.json({
            ok: true,
            usuario: regCajaEliminado
        })
    })
})

module.exports = app;