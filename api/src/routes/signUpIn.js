let router = require('express').Router();
let dbname = require('../database/db');
let bcrypt = require('bcrypt');
const saltRounds = 10;






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

router.post('/sign-in', async function (req, res) {
    const password = req.body.password;
    console.log(password)
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    dbname.query(`INSERT INTO users (name, EmailAdress, password) VALUES ('${req.body.name}', '${req.body.email}', '${encryptedPassword}')`, function (error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            res.send({
                "code": 200,
                "success": "user registered successfully"
            })
        }
    })
})

///////////// GET SANS MOT DE PASSE CRYPTE ////////////////////////////////////////////////////////////////////////////////////////////////////

// router.get('/sign-up', function (req, res) {
//     dbname.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         if (result.length == 0) {
//             res.status(200).send("Sorry, we don't know this user")
//         } else { res.status(200).send("You are authenticated") }
//     });
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/sign-up', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    dbname.query(`SELECT * FROM users WHERE EmailAdress = ?`, [email], async function (error, results, fields) {
        console.log(results);
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                const comparision = await bcrypt.compare(password, results[0].password)
                if (comparision) {
                    res.send({
                        "code": 200,
                        "sucess": "login sucessfull"
                    })
                } else {
                    res.send({
                        "code": 204,
                        "sucess": "Email and Password does not match"
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

module.exports = router;