
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));

const PORT = process.env.HTTP_PORT || 4001;


app.get('/', (req, res)=>{
    res.send('Just gotta send it');
})

app.get('/flower', (req, res)=>{
    res.json({
        name: 'dandelion',
        color: 'Blue-ish'
    });
});

app.listen(PORT, ()=>{
    console.log(`server listen at port ${PORT}`);
})

