import express from 'express';
import router from './router'

const app = express();

app.get('/', (req, res) => {
    console.log("heya express");
    res.status(200)
    res.json({message: "helyo"})
})

app.use('/api', router)

export default app;
