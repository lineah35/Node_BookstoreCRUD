const express = require('express');
const router = express.Router();
const {sale, deleteSale, updateID, updateInfo, retrieveInfo} = require('../controllers/bookstore.controllers');

router.all('/*', checkUser);

function checkUser (req, res, next) { //whatever is the specified path is the path the user will be redirected to. Another form of authentication.
    console.log("req path:", req.path)
    const verifyRole = req.body.role;
    const verifyLogIn = req.body.logged_in;
    if(req.path == '/access' && verifyRole === "cashier" && verifyLogIn == true) {
        console.log("request path:", req.path);
        next()
    } else if (verifyRole === "admin" && verifyLogIn == true) {
        next();
    } else {
        res.send("Access denied.");
    }
}

router.post('/sale', sale);

router.put('/updated/id/:id', updateID);

// router.use((req, res, next) => {
//     const verifyRole = req.body.role;
//     const verifyLogIn = req.body.logged_in;
//     if(verifyRole === "admin" && verifyLogIn === true) {
//         next()
//     } else {
//         res.send("Access denied.");
//     }
// })

router.post('/update/info/:id', updateInfo);

router.delete('/deleted/:id', deleteSale);

router.get('/', (req, res) => {
    res.send("Hello world!");
})


// router.use((req, res, next) => {
//     const verifyAdmin = req.body.role;
//     console.log("role", verifyAdmin);
//     const verifyLogIn = req.body.logged_in;
//     console.log("logged in?", verifyLogIn);
//     if(verifyAdmin === "admin" && verifyLogIn === true) {
//         next();
//     } else {
//         res.send("Access denied.")
//     }
// })

router.get('/access', retrieveInfo);

module.exports = router;

//api for cashier: he enters ID and gets to see book id and customer name only. 




