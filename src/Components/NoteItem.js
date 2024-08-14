import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import { Truncate } from "../UsefulFunctions"

const NoteItem = ({ note, updatenote, showToast }) => {
  const { deleteNote } = useContext(noteContext);

  return (
    <div className="rounded">
      <div className="mb-6 flex h-auto w-full flex-col justify-between rounded-lg border border-gray-400 bg-white px-4 py-4">
        <div>
          <p className="my-2 text-sm">Created On: <span className='text-blue-500'>{note.date}</span></p>
          <Link className="mb-3 font-bold text-gray-800 hover:font-extrabold" to={`/note/${note._id}`}>
            {Truncate(note.title, 0, 50, ".......")}
          </Link>
          <p className="text-sm text-gray-800 hover:font-extrabold">
            {Truncate(note.description, 0, 80, ".......")}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-800 hover:font-extrabold">
            <p className={note.tag.length > 0 ? "text-sm font-bold my-2" : "hidden"}>
              Tag: {Truncate(note.tag, 0, 15, ".....")}
            </p>
            <i className="fa-solid fa-trash cursor-pointer" onClick={() => {
              showToast.promise(deleteNote(note._id), {
                loading: "Deleting Note....",
                success: <b>Note Deleted</b>,
                error: <b>Error Occurred</b>,
              })
            }}></i>
            <i className="fa-solid fa-pen-to-square cursor-pointer" onClick={() => { updatenote(note); }}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteItem