const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const Diary = require('./models/Diary')
const cors = require('cors')
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
// const authJWT = require('./middleware/auth')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
}).then(() => console.log('DB Connected') )
.catch(err => console.log(err))

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if (err) return res.status(403);
       req.user = user;
       next();
    });
};

app.post('/', function(req, res) {
    res.send("ok")
   
});

app.get("/diary/:username",authJWT, async (req, res) => {
    try {
      const diary = await Diary.find({username: req.params.username})
      res.status(200).json(diary)
    } catch (err) {
      res.status(500).json(err);
    }
  });

app.post('/add-to-diary',(req, res)=>{
    const Data = new Diary({
        title : req.body.title,
        description : req.body.description,
        date : req.body.date,
        username : req.body.username
    })
    Data.save().then( data => {
        res.status(200).json(data);
        res.redirect('/diary');
    }).catch(err => console.log(err))
})

app.get('/diary/view/:id',authJWT, (req, res) => {
    // try {
    //     const diary = await Diary.findOne({ _id:req.params.id }) 
    //     res.send(diary)
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    Diary.findOne({
        _id:req.params.id
    }).then(data => {
        res.send(data)
    }).catch(err => console.log(err))
})

app.get('/diary/edit/:id', (req, res)=>{
    Diary.findOne({
        _id:req.params.id
    }).then(data => {
        res.send(data)
    }).catch(err => console.log(err))
})

app.put('/diary/edit/:id', (req, res) => {
    const newId = req.params.id.slice(1)
    Diary.findOne({
        _id: newId
    }).then(data => {
            data.title = req.body.title,
            data.description = req.body.description,
            data.date = req.body.date
        data.save().then(() => {
            res.status(200).json("updated")
        }).catch(err => console.log(err))
    }).catch(err => console.log(err));
})

app.delete('/diary/delete/:id', (req, res) => {
    Diary.remove({
        _id: req.params.id
    }).then((data) => {
        res.send(`removed`)
    }).catch(err => console.log(err));
})

app.use('/api/users', userRoute)

app.listen(port, () => console.log(`Server is running on ${port}`))