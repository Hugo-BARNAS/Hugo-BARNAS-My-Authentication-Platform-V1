let router = require('express').Router();
let dbname = require('../database/db');
let bcrypt = require('bcrypt');
const express = require('express');
const security = require('../middleware/security');
const saltRounds = 10;
const app = express();
const jwt = require('jsonwebtoken');
const config = require('./config');






// router.post('/sign-in', function (req, res) {
//     var sql = `INSERT INTO users (name, EmailAdress, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`;
//     dbname.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted")
//     })
//     res.send("OK")
// });

// router.post('/sign-in', async (req, res, next) => {
//     try {
//         const hashedPassword = await bcrypt.hash('${req.body.password}', 10);
//         const result = await dbname.query(
//             `INSERT INTO users (name, EmailAdress, password) VALUES ('${req.body.name}', '${req.body.email}', '${hashedPassword}')`,
//         );
//         return res.json(result.rows[0]);
//     } catch (e) {
//         return next(e)
//     }
// })


function middleware(req, res, next) {
    let y = req.body.name;
    console.log(y);
    let x = `SELECT name FROM users`;
    console.log(x);
    dbname.query(x, function (error, results) {
        if (error) throw error
        let theName = results.find(element => element.name === req.body.name)
        if (theName) {
            res.status(202).send('error')
        } else {
            next()
        }
    });
};


router.post('/sign-up', middleware, async function (req, res) {
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    dbname.query(`INSERT INTO users (name, EmailAdress, password) VALUES ('${req.body.name}', '${req.body.email}', '${encryptedPassword}')`, function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            const email = req.body.email;
            dbname.query(`SELECT * FROM users WHERE EmailAdress = ?`, [email], async function (error, results, fields) {
                let token = jwt.sign({ id: results[0].id, name: results[0].name }, config.secret, { expiresIn: 86400 })
                res.send({
                    "code": 200,
                    "success": "user registered successfully",
                    auth: true,
                    token: token,
                    user: results[0],
                })
            })

        }
    })
});

///////////// GET SANS MOT DE PASSE CRYPTE ////////////////////////////////////////////////////////////////////////////////////////////////////

// router.get('/sign-in', function (req, res) {
//     dbname.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         if (result.length == 0) {
//             res.status(200).send("Sorry, we don't know this user")
//         } else { res.status(200).send("You are authenticated") }
//     });
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/sign-in', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    dbname.query(`SELECT * FROM users WHERE EmailAdress = ?`, [email], async function (error, results, fields) {
        // console.log(results)
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                const comparision = await bcrypt.compare(password, results[0].password)
                if (comparision) {
                    let token = jwt.sign({ id: results[0].id, name: results[0].name }, config.secret, { expiresIn: 86400 });
                    console.log(token);
                    res.send({
                        "code": 200,
                        "success": "login sucessfull",
                        auth: true,
                        token: token,
                        user: results[0],
                    })
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and Password does not match"
                    })
                }
            }
            else {
                res.send({
                    "code": 206,
                    "success": "Email or Password do not exits",
                });
            }
        }
    });
});

router.post('/add-new-contact', function (req, res) {
    const sql = `INSERT INTO contacts (name, email, id_user_affiliate) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.id_user_affiliate}')`;
    dbname.query(sql, function (err, result) {
        if (err) throw err;
        res.send("1 record inserted");
        console.log("1 record inserted");
    })
});

router.get('/get-contacts/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    const jointUsCo = `SELECT * FROM  users INNER JOIN contacts ON users.id = contacts.id_user_affiliate WHERE users.id = ${id}`;
    console.log(jointUsCo);
    dbname.query(jointUsCo, function (err, result, fields) {
        console.log(result);
        if (result.length == 0) {
            res.status(200).send("Sorry Any Contact")
        } else { 
            res.status(200).send(result); 
        }
    })
})

// router.get('/sign-in', function (req, res) {
//     dbname.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         if (result.length == 0) {
//             res.status(200).send("Sorry, we don't know this user")
//         } else { res.status(200).send("You are authenticated") }
//     });
// });


module.exports = router;
