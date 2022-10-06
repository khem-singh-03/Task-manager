const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const { findByIdAndUpdate } = require('../models/Notes');
const Notes = require('../models/Notes')

// Route 4 :: get all the notes using GET "/api/notes/fetchallnotes"  login required

router.get('./fetchallnotes',fetchuser,async (req,res)=>{
    
    console.log("What's the matter???");

    try {
        const notes = await Notes.find({user:req.user.id})
        
        res.json(notes)
    } catch (error) {

        console.log(`Exception encountered ${error.message}`)
        res.status(500).send("Internal server error")
    }
})

// Route 5 :: Add a new node using post  "/api/notes/addnote"  login required
router.post('/addnote',fetchuser,[body('title','Enter a valid title ').isLength({ min: 3 }), 
    body('description','Description must be atleast 5 characters').isLength({ min: 5 })],async (req,res)=>{
   
    try {
    
        const {title,description,tag} = req.body
        // if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,description,tag,user:req.user.id
        })
         const savedNote = await note.save();

          res.json(savedNote)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route 6 :: Update a  node using put "/api/notes/updatenote"  login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body

    // create a newnote object 

    const newNote = {};

     if(title)
     {newNote.title=title};
     if(description)
     {newNote.description=description};
     if(tag)
     {newNote.tag=tag};

    // find the note to be updated and update it 
      let note = await Notes.findById(req.params.id);
      if(!note)
      {
        return  res.status(404).send("Not found")
      }
      
      if(note.user.toString()!==req.user.id)
      {
             return res.status(401).send("Not allowed")
      }

       note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new :true})
       res.json({note})
    })

    // Route 7 :: Delete a  node using Delete "/api/notes/deletenote"  login required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body
   
    try {
        // find the note to be deleted and delete it 
      let note = await Notes.findById(req.params.id);
      if(!note)
      {
        return  res.status(404).send("Not found")
      }
      // allow deletion only if user own this note
      if(note.user.toString()!==req.user.id)
      {
             return res.status(401).send("Not allowed")
      }

       note = await Notes.findByIdAndDelete(req.params.id)
       res.json({"success":"note has been deleted",note:note})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
    
    })

    
module.exports = router