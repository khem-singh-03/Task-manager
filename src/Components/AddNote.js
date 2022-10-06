import React, { useState } from 'react'
import { useContext } from 'react';
import NoteContext from '../Context/notes/NoteContext';
const AddNote = (props) => {
    const context = useContext(NoteContext); 
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick= (e)=>{
          e.preventDefault()
           addNote(note.title,note.description,note.tag);
           setNote({title:"",description:"",tag:""});
           props.showAlert("Added successfully","success");
    }  
    const onChange = (e)=>{
          setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    
    <div className='container my-3'>
           <h1>Add a note</h1>

             <form className='container my-3'>
                  <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name ="title" aria-describedby="emailHelp" value ={note.title} placeholder="Enter title" minLength={5} required onChange={onChange}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name = "description" value ={note.description} placeholder="Enter description" minLength={5} required onChange={onChange}/>
                  </div>

                  <div className="form-group my-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name = "tag" value ={note.tag} placeholder="Enter tag" onChange={onChange}/>
                  </div>
                  <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
          </div> 
    
  )
}

export default AddNote
