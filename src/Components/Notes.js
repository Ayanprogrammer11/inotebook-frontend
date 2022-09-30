import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Loading from './Loading';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const Navigate = useNavigate();
  const {setProgress, showToast} = props;
    const context = useContext(noteContext);
  let {notes, getNotes, editNote} = context;
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});


  useEffect( () => {
    if(localStorage.getItem("token")) {
      setProgress(20);
     
        getNotes();

     
 setProgress(100);
        setLoading(false);
      
    }
      else {
        Navigate("/login")
      }
      // eslint-disable-next-line
  }, [])
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }
  const ref = useRef();
  const refClose = useRef();
  const onChange = (event) => {
    setNote({...note, [event.target.name]: event.target.value})
}
const handleClick = (e) => {
  console.log("Updating the note", note);
    refClose.current.click();
    showToast.promise(editNote(note.id, note.etitle, note.edescription, note.etag), {
      loading: "Updating Note....",
          success: <b>Note Updated</b>,
          error: <b>Error Occured</b>,
          
    })
   
    // showAlert("Note Updated", "success");
}
  return (
    <>
    <AddNote showToast={showToast}/>

    
    <button type="button"
  class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out hidden"
  data-bs-toggle="modal" data-bs-target="#staticBackdrop1" ref={ref}>
  Launch static backdrop modal
</button>

{/* <!-- Modal --> */}
<div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="staticBackdrop1Label" aria-hidden="true">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
          Edit Note
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
        {/* Modal body starts here ----------------------- */}
      <form>
    <div class="grid gap-6 mb-6 md:grid-cols-1">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tite" required="" name="etitle" value={note.etitle} onChange={onChange}/>
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
            <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required="" value={note.edescription} onChange={onChange} name="edescription"/>
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tag</label>
            <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tag" required="" value={note.etag} onChange={onChange} name="etag"/>
        </div>  
    </div>
</form>
{/* Modal body ends here --------------------------------------------- */}
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button"
          class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button type="button"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5}>Update Note</button>
      </div>
    </div>
  </div>
</div>
 <h2 className="text-4xl text-black font-extrabold">Your Notes</h2>
<div className="text-center text-1xl my-4">
        {notes.length === 0 && <p className='text-muted font-weight-bold'>No Notes to Display</p>}
        </div>
        {<Loading /> && loading === true ? <Loading /> : ""}
<div class="mx-auto container py-10 px-6 mx-50">
            <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       
       
        
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} updatenote={updatenote} showToast={showToast}/>;
        })}
        </div>
        </div>
        </>
  )
}

export default Notes