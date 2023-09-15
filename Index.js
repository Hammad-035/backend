import express from 'express';
import mongoose from "mongoose";
import cors from 'cors'
import UserSchema from './models/Users.js'
const app =  express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Crud');

app.get('/', (req, res) => {
    UserSchema.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserSchema.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res)=> {
    const id = req.params.id;
    UserSchema.findByIdAndUpdate({_id:id},
        {
            name:req.body.name,
             email:req.body.email,
              age:req.body.age
            })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    UserSchema.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.post("/createUser", (req,res)=> {
    UserSchema.create(req.body)
    .then(users => res.json(users))
    .catch(err =>res.json(err))
})


app.listen(8000, ()=> {
    console.log('App is Listenening on Port 8000');
})