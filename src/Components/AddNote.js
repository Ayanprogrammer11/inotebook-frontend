import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {

const Navigate = useNavigate();
  // States
  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const [ing, setIng] = useState("Add Note");

//  Hooks
  const context = useContext(noteContext);

// Destructuring
const {showToast} = props;
const {addNote} = context;



    

    // Logic to prevent insensible note
    const slicedTitle = note.title.split(" ");
    const slicedDescription = note.description.split(" ");
    const slicedTag = note.tag.split(" ");




    const handleClick = (e) => {

      e.preventDefault();

      try {
        // Logic to prevent more than 38 characters in single word (it is necessary because if we not do it then it would cross the card)

        if(slicedTitle[0].length > 38 || slicedDescription[0].length > 38 || slicedTag[0].length > 38) {
          //  showAlert("Please Enter a sensible note", "danger");
          showToast.error("Please Enter a Sensible Note")
        }else if(!localStorage.getItem("token")) {
          Navigate("/login")
          showToast.error("Session Timed out! Login or Signup again");
        }  else {


        setIng("Adding Note...")
        e.preventDefault();
        // addNote(note.title, note.description, note.tag);
        showToast.promise(addNote(note.title, note.description, note.tag), {
          loading: "Adding Note....",
          success: <b>Note Added</b>,
          error: <b>Error Occured</b>,
        });
        setNote({title: "", description: "", tag: ""});
        // showAlert("Note Added", "success");
        // showToast.success()
        
        setIng("Add Note");

        }
      } catch(err) {
        console.log("error Occured");
      }

    }


    const onChange = (event) => {
            setNote({...note, [event.target.name]: event.target.value})
    }


  return (
    <>
   
<form onSubmit={handleClick}>
    <div class="my-6 mb-6 grid gap-6 md:grid-cols-1">
        <div>
            <label for="first_name" class="mb-2 block text-sm font-medium text-gray-900">Title</label>
            <input type="text" id="first_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Title" required name="title" value={note.title} onChange={onChange}/>
        </div>
        <div>
            <label for="last_name" class="mb-2 block text-sm font-medium text-gray-900">Description</label>
            <input type="text" id="last_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Description" required value={note.description} onChange={onChange} name="description"/>
        </div>
        <div>
            <label for="company" class="mb-2 block text-sm font-medium text-gray-900">Tag</label>
            <input type="text" id="company" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Tag" required value={note.tag} onChange={onChange} name="tag"/>
        </div>  
       
    <button class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto" type="submit">{ing}</button>
    </div>
</form>
  
      
  
    </>
  )
}

export default AddNote
