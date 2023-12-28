const express = require('express');
const PORT = process.env.HTTP_PORT || 4001;
const app = express();

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

