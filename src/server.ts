import express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log("heya express");
    res.status(200)
    res.json({message: "helyo"})
})

export default app;