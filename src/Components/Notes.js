import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Loading from './Loading';
import NoteItem from './NoteItem';

const Notes = ({ setProgress, showToast }) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  let { notes, getNotes, editNote } = context;
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const ref = useRef();
  const refClose = useRef();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setProgress(20);
      getNotes()
        .then(() => {
          setProgress(100);
          setLoading(false);
        })
        .catch(() => {
          setProgress(0);
          showToast.error("Error Occurred")
        });
    } else {
      navigate("/login")
    }
  }, [])

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }

  const handleClick = (e) => {
    refClose.current.click();
    showToast.promise(editNote(note.id, note.etitle, note.edescription, note.etag), {
      loading: "Updating Note....",
      success: <b>Note Updated</b>,
      error: <b>Error Occurred</b>,
    })
  }

  return (
    <>
      <AddNote showToast={showToast} />

      <button type="button"
        className="hidden rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        data-bs-toggle="modal" data-bs-target="#staticBackdrop1" ref={ref}>
        Launch static backdrop modal
      </button>

{/* <!-- Modal --> */}
<div class="modal fade fixed left-0 top-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="staticBackdrop1Label" aria-hidden="true">
  <div class="modal-dialog pointer-events-none relative w-auto">
    <div
      class="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
          Edit Note
        </h5>
        <button type="button"
          class="btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
        {/* Modal body starts here ----------------------- */}
      <form>
    <div class="mb-6 grid gap-6 md:grid-cols-1">
        <div>
            <label for="first_name" class="mb-2 block text-sm font-medium text-gray-900">Title</label>
            <input type="text" id="first_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Tite" required="" name="etitle" value={note.etitle} onChange={onChange}/>
        </div>
        <div>
            <label for="last_name" class="mb-2 block text-sm font-medium text-gray-900">Description</label>
            <input type="text" id="last_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Description" required="" value={note.edescription} onChange={onChange} name="edescription"/>
        </div>
        <div>
            <label for="company" class="mb-2 block text-sm font-medium text-gray-900">Tag</label>
            <input type="text" id="company" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Tag" required="" value={note.etag} onChange={onChange} name="etag"/>
        </div>  
    </div>
</form>
{/* Modal body ends here --------------------------------------------- */}
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4">
        <button type="button"
          class="inline-block rounded bg-purple-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
          data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button type="button"
          class="ml-1 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg" onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5}>Update Note</button>
      </div>
    </div>
  </div>
</div>

 <h2 className="text-4xl font-extrabold text-black">Your Notes</h2>
      
      {loading ? <Loading /> : (
        <div className="container mx-auto px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.length === 0 ? "No Notes to Display" : (
              notes.map((note) => (
                <NoteItem note={note} key={note._id} updatenote={updatenote} showToast={showToast} />
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Notes