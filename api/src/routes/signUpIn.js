let router = require('express').Router();
let dbname = require('../database/db');




router.get('/sign-up', function (req, res) {
    dbname.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length == 0) {
            res.status(200).send("Sorry, we don't know this user")
        } else { res.status(200).send("You are authenticated") }
    });
});

router.post('/sign-in', function (req, res) {
    var sql = `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`;
    dbname.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted")
    })
    res.send("OK")
});


module.exports = router;