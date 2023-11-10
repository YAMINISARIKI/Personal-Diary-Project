import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import login from "./model/login";
import data from "./data";
import multer from "multer";
import path from 'path';
const app=express();

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
// app.use(express.static('public'))
app.use('/uploads',express.static('uploads'));

mongoose.connect('mongodb+srv://Yamini:AJNWs0f7JClq1ogA@cluster0.qumzf5t.mongodb.net/Diary?retryWrites=true&w=majority&appName=AtlasApp')
.then(()=>app.listen(2000))
.then(()=> console.log("connected to database successfully and listening to localhost 2000"))
.catch((err)=>console.log(err));


//--------------------adding signed up data to data base----------------

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = new login({ username, password });
      await user.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get('/getaccount',async(req,res,next)=>{
    let accountdata
    try{
        accountdata =await login.find()     
    }
    catch(err){
        console.log(err)
    }
    if(!accountdata)
    {
        alert("user not found")
    }
return res.status(200).json({accountdata})
})

app.delete('/deleteuser/:id', async (req, res, next)=>{
  const _id = req.params.id  //to get id from url
  let accountdata;
  try{
      accountdata = await login.findByIdAndDelete(_id);
  }catch(err){
      return console.log(err)
  }
  if(!accountdata){
      return res.status(400).json({message:"Unable to delete"})
  }
  return res.status(200).json({messgae:"deleted."})
})
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await login.findOne({ username, password });
      if (user) {
        res.status(200).send(user.username)
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

//------------Adding data entries into data base------------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null,Date.now()+"_"+file.originalname)
    },
  })
  
  const upload = multer({ storage: storage })

app.post('/adddata',upload.single("myfile"),async(req,res,next)=>{
    const imagepath = (req.file) ? req.file.filename : null
    console.log(req.body)
    const title = req.body.title
    const content = req.body.content
    const usermail = req.body.email
    
    console.log(usermail)

    try {
            
            const entry = new data({ title, content, imagepath ,usermail});
            console.log(entry)
            entry.save()
            res.status(201).send('Entry added successfully');
        } 
        catch (error) {
            res.status(500).send(error.message);
        }

    
});

//------------------getting added data into showdentry page ------------------------

app.post('/getentries/', async (req, res,next) => {
  
  try {
      const entries = await data.find();
      const result = entries.filter((entry)=>{
        return entry.usermail===req.body.email;
      })
      res.json(result);
      
  } catch (error) {
      res.status(500).send(error.message);
  }
});




//-------Deleting the added diary entries-------------------------------

app.delete('/deleteEntry/:id', async (req, res) => {
    const _id = req.params.id ;
    let diarydata;
    try{
        diarydata = await data.findByIdAndDelete(_id);
    }catch(err){
        return console.log(err)
    }
    if(!diarydata){
        return res.status(400).json({message:"Unable to delete"})
    }
    return res.status(200).json({messgae:"deleted."})
});

//----------------editing the data that present in showentry page -------------------------



// Fetch entry by ID
app.get('/getentrybyid/:id', async (req, res) => {
    try {
        const entry = await data.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.status(200).json({ entry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update entry by ID

const uploadEdit = upload.single('myfile'); // Add this line before the 'app.put' route handler

app.put('/updateEntry/:id', uploadEdit, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        let imagePath = null;

        const existingEntry = await data.findById(id);
        if (!existingEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        if (req.file) {
            imagePath = req.file.filename;
        }
        else {
          imagePath = existingEntry.imagepath; // Retain the existing image if no new image is uploaded
      }

        const updatedEntry = await data.findByIdAndUpdate(id, { title, content, imagepath: imagePath }, { new: true });
        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        return res.status(200).json({ message: "Entry updated successfully", updatedEntry });
    } catch (error) {
        console.error('Error updating entry:', error);
        return res.status(500).json({ message: "Error updating entry: " + error.message });
    }
});
