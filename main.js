// Step 1 - Load libraries
const path = require('path');
const express = require('express');

var fileList = ['chase.jpg','rubble.jpg','sky.jpg'];

// var length = filelist.length;
// var randomNum = Math.floor(Math.random() * Math.floor(length));
// var filename = filelist[randomNum];

// var asciify = require('asciify-image');
 
const randomFile = (array) => {
    const randomNum = Math.floor(Math.random() * array.length)
    return array[randomNum];
    }    

// Step 2 - Create instance of Express
const app = express();

// Step 3 - Define our routes
// GET /image -> text/html
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
// app.get('/images', (req, resp) => {
//     resp.status(200);
//     resp.sendfile(path.join(__dirname, 'images', randomFile(filelist)));
// });

app.get('/images', (req, resp) => {
    resp.status(200);
    resp.format({
        'text/html' : () => {
            resp.send(`<img src='/${randomFile(fileList)}'>`);
        },
        'image/jpg' : () => {
            resp.sendFile(path.join(__dirname, 'images', randomFile(fileList)));
        },
        'application/json': () => {
            resp.json({filename: randomFile(fileList)});
        },
        // 'text/plain' : () => {
        //         var options = {
        //             fit:    'box',
        //             width:  200,
        //             height: 100,
        //             color: false
        //         }
        //         asciify(path.join(__dirname, 'images', randomFile(fileList)), options, 
        //         function (err, asciified) {
        //         if (err) throw err;
        //          console.log(asciified);
        //       });
        // },
        'default' : () => {
            resp.status(406);
            resp.end();
        },
    });
 });

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, resp) => {
    // resp.redirect('/')
    resp.status(404);
    resp.sendfile(path.join(__dirname, 'public', '404.html'));
});

// Step 4 - assign port and Start Server
const PORT = parseInt(process.argv[2]) || 
        parseInt(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
   console.info(`App started on port ${PORT} at ${new Date()}`);
});
