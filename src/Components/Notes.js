import React, { useEffect,useRef,useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import { useContext } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import {useNavigate} from 'react-router-dom'
const Notes = (props) => {
    const context = useContext(NoteContext); 
    let history = useNavigate();
    const {notes,getAllNotes,editNote} = context;
   // console.log(notes.length);
    useEffect(()=>{
        if(localStorage.getItem('token'))
        getAllNotes()
        else
        history("/login");  
    },[])

    const ref=  useRef(null)
    const refClose=  useRef(null)
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})

    const updateNote= (currentNote)=>{
          ref.current.click()
          setNote({id :currentNote._id,etitle :currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
          
    }
    
    const handleClick= (e)=>{
      console.log("Updating the note...",note)
    
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
      props.showAlert("Updated successfully","success");
}
const onChange = (e)=>{
      setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <> 
        <AddNote showAlert={props.showAlert}/>
                    
              <button  ref ={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
              </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                          <form className='container my-3'>
                                <div className="form-group my-3">
                                  <label htmlFor="title">Title</label>
                                  <input type="text" className="form-control" id="etitle" name ="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter title" minLength={5} required onChange={onChange}/>
                                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group my-3">
                                  <label htmlFor="description">Description</label>
                                  <input type="text" className="form-control" id="edescription" name = "edescription" value={note.edescription} placeholder="Enter description" minLength={5} required onChange={onChange}/>
                                </div>

                                <div className="form-group my-3">
                                  <label htmlFor="tag">Tag</label>
                                  <input type="text" className="form-control" id="etag" name = "etag" value={note.etag} placeholder="Enter tag" onChange={onChange}/>
                                </div>
                                
                          </form>
                  </div>
                  <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button minLength={5} required onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                  </div>
                </div>
              </div>
            </div>
        <div className='row my-3'>
          <h1>Your Notes</h1>
            <div className="container mx-2">
                      {notes.length===0 && 'No Notes yet'}
                  
            </div>
        
            {notes.map((note)=>{
                    return <NoteItem key = {note._id} showAlert={props.showAlert} updateNote ={updateNote} note = {note} />
                })}
       </div>
    </>
    
  )
}

export default Notes
