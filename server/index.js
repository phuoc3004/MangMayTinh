const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mmtpassword'
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/api/get', (req, res) => {
    const sqlSelect = 
    "SELECT * FROM manage_password";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});


app.post("/api/insert", (req, res) => {

    const appName = req.body.appName;
    const appPassword = req.body.appPassword;

    const sqlInsert = "INSERT INTO manage_password (appName, appPassword) VALUES (?,?)";
    db.query(sqlInsert, [appName, appPassword] , (err, result) => {
        console.log("BKDN" + result);
    });
});


app.delete("/api/delete/:appName", (req, res) => {
    
    const name = req.params.appName
    const sqlDelete = "DELETE FROM manage_password WHERE appName = ?";

    db.query(sqlDelete, name, (err, result) => {
        console.log("KAMIKAZE"+result);
    });

}); 


app.put("/api/update", (req, res) => {

    const name = req.body.appName;
    const password = req.body.appPassword;

    const sqlUpdate = "UPDATE manage_password SET appPassword = ? WHERE appName = ?";
    db.query(sqlUpdate, [password, name], (err, result) => {
        console.log(result);
    });

}); 


app.listen(3001, ()=>{
    console.log('running on 3001');
});