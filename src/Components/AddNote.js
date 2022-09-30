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
    <div class="grid gap-6 mb-6 md:grid-cols-1 my-6">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required name="title" value={note.title} onChange={onChange}/>
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
            <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required value={note.description} onChange={onChange} name="description"/>
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tag</label>
            <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tag" required value={note.tag} onChange={onChange} name="tag"/>
        </div>  
       
    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">{ing}</button>
    </div>
</form>
  
      
  
    </>
  )
}

export default AddNote
