import React, { useContext } from 'react'

import noteContext from '../context/notes/noteContext';

import { Truncate } from "../UsefulFunctions"

import { Link } from 'react-router-dom';


const NoteItem = (props) => {

    const {note, updatenote, showToast} = props;

    const context = useContext(noteContext);

    const {deleteNote} = context;

  return (

<div class="rounded">
        <div class="w-full h-auto flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
            <div>
                <Link class="text-gray-800 dark:text-gray-100 font-bold mb-3 hover:transition-all hover:font-extrabold" to={`/note/${note._id}`}>{Truncate(note.title, 0, 50, ".......")}</Link>
                <p class="text-gray-800 dark:text-gray-100 text-sm hover:transition-all hover:font-extrabold">{Truncate(note.description, 0, 80, ".......")}</p>
            </div>
            <div>
                <div class="flex items-center justify-between text-gray-800 dark:text-gray-100 hover:transition-all hover:font-extrabold">
                    <p class={note.tag.length > 0 ? "text-sm font-bold my-2" : "hidden"}>Tag: {Truncate(note.tag, 0, 15, ".....")}</p>

                    {/* Font-Awesome Icos start here */}

                    <i className="fa-solid fa-trash" onClick={() => {showToast.promise(deleteNote(note._id), {
                        loading: "Deleting Note....",
                        success: <b>Note Deleted</b>,
                        error: <b>Error Occured</b>,
                    })}} ></i>
                <i className="fa-solid fa-pen-to-square" onClick={() => {updatenote(note);}}></i>

                {/* Font-Awesome Icons end here */}
    
                </div>
            </div>
        </div>
        </div>

  )
}

export default NoteItem
