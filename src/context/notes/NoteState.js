import React, { useState } from "react";
import Loading from "../../Components/Loading";
import noteContext from "./noteContext";
export default function NoteState(props) {
  // Main Host
  const host = "http://localhost:5000";
  // An Array where notes will be stored after getNotes function get triggered (When Api is called)
  const initialNotes = [];
  // A State to Set Notes after different actions
  const [notes, setNotes] = useState(initialNotes);
  const [separateNote, setSeparateNote] = useState({title: "", description: "", email: ""})
  // const [loading, setLoading] = useState(true);
const {showToast} = props;
  // Functton for fetching All Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
    // setLoading(false);
  };

  const getNote = async (id) => {
    const response = await fetch(`${host}/api/notes/getnote/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    if(json.code === 401) {
      showToast.error("Permission Not Granted", {duration: 4000});
      setSeparateNote({
        title: "Permission Not Granted",
        description: "Permission Not Granted",
        tag: "Permission Not Granted"
      })
    } else {
    setSeparateNote({
      title: json.title,
      description: json.description,
      tag: json.tag
    })
  }
    // setNotes(json);
  }

  // Function for Adding a Note
  const addNote = async (title, description, tag) => {
  
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag}),
    });
    const json =  await response.json();
    console.log(json);
    setNotes(notes.concat(json))
  
    // const note = {
    //   "_id": "61322f119553781a8ca8d0e08",
    //   "user": "6131dc5e3e4037cd4734a0664",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-09-03T14:20:09.668Z",
    //   "__v": 0
    // };

    
  };

  // Function for deleting a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      }
    });
    const json = await response.json();
    console.log(json);
    console.log("Deleting a Note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    console.log("Note Deleted");
  };
  // Function for editing a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic for Client-side Editing
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <noteContext.Provider
      value={{ notes,addNote, deleteNote, editNote, getNotes, getNote, separateNote }}
    >
      {/* {<Loading /> && loading} */}
      {props.children}
    </noteContext.Provider>
  );
}
