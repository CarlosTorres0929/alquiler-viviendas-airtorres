/*Author: Carlos Torres
  Email: ct059489@gmail.com*/
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const app = express();

app.use(cors);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// endPoint para registrar los usuarios
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/registeruser

app.post('/registeruser', async (req, res) => {
    try{
        await db.collection('users').add({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password
        });
        res.json({response: "User created successfully"});
    }catch(error){
        res.json({response: error});
    }
    
});

// endPoint para listar los usuarios
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/listusers

app.get('/listusers', async (req, res) => {
    try{
        let users = [];
        // get all database register
        let allUsers = await db.collection('users').get();
        for(const doc of allUsers.docs){
            let userToAdd = {
                id: doc.id,
                nombre: doc.data().nombre,
                apellido: doc.data().apellido,
                email: doc.data().email,
                password: doc.data().password
            }
            users.push(userToAdd);
        }
        res.json({users: users})
    }catch(error){
        res.json({response: error});
    }
});

// endPoint para actualizar los usuarios
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/updateuser

app.put('/updateuser', async (req, res) => {
    try{
        const {id, nombre, apellido, email, password} = req.body;
        let user = await db.collection('users').doc(id).set({
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password
        })
        res.json({response: "User updated successfully"});
    }catch(error){
        res.json({response: error});
    }
});

// endPoint para eliminar los usuarios
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/deleteuser

app.delete('/deleteuser', async (req,res) => {
    try{
        const id = req.body.id;
        let deleteUser = await db.collection('users').doc(id).delete();
        res.json({response: "User deleted successfully"})
    }catch(error){
        res.json({response: error});
    }
});

// funciones para los inmuebles
// endPoint para crear los inmuebles
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/createinmueble


app.post('/createinmueble', async (req, res) => {
    try{
        await db.collection('inmuebles').add({
            title: req.body.title,
            type: req.body.type,
            addess: req.body.addess,
            rooms: req.body.rooms,
            price: req.body.price,
            area: req.body.area
        });
        res.json({response: "Inmueble created successfully"});
    }catch(error){
        res.json({response: error});
    }
    
});

// endPoint para listar los inmuebles
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/listinmuebles

app.get('/listinmuebles', async (req, res) => {
    try{
        let inmuebles = [];
        // get all database register
        let allinmuebles = await db.collection('inmuebles').get();
        for(const doc of allinmuebles.docs){
            let inmuebleToAdd = {
                id: doc.id,
                title: doc.data().title,
                type: doc.data().type,
                addess: doc.data().addess,
                rooms: doc.data().rooms,
                price: doc.data().price,
                area: doc.data().area
            }
            inmuebles.push(inmuebleToAdd);
        }
        res.json({inmuebles: inmuebles})
    }catch(error){
        res.json({response: error});
    }
});

// endPoint para actualizar los inmuebles
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/updateinmueble

app.put('/updateinmueble', async (req, res) => {
    try{
        const {id, title, type, addess, rooms, price, area} = req.body;
        let inmueble = await db.collection('inmuebles').doc(id).set({
            title: title,
            type: type,
            addess: addess,
            rooms: rooms,
            price: price,
            area: area
        })
        res.json({response: "Inmueble updated successfully"});
    }catch(error){
        res.json({response: error});
    }
});

// endPoint para eliminar los inmuebles
// https://us-central1-alquiler-viviendas-airtorres.cloudfunctions.net/api/deleteinmuebles

app.delete('/deleteinmuebles', async (req,res) => {
    try{
        const id = req.body.id;
        let deleteInmuebles = await db.collection('inmuebles').doc(id).delete();
        res.json({response: "Inmueble deleted successfully"})
    }catch(error){
        res.json({response: error});
    }
});

exports.api = functions.https.onRequest(app);