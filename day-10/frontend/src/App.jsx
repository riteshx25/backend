import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description 1",
    },
    {
      title: "test title 2",
      description: "test description 2",
    },
  ]);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/api/notes");
    setNotes(res.data.notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const [editingId, setEditingId] = useState(null);

  const editHandler = (note) => {
    setFormData({
      title: note.title,
      description: note.description,
    });

    setEditingId(note._id);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.patch(`http://localhost:3000/api/notes/${editingId}`, formData);
      fetchNotes();
      setEditingId(null);
    } else {
      try {
        const res = await axios.post("http://localhost:3000/api/notes", formData);
        fetchNotes();
        console.log(res);
      } catch (error) {
        console.error(error.message);
      }
    }

    setFormData({
      title: "",
      description: "",
    });
  };

  const handleDelete = async (noteId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
      fetchNotes();
      console.log(res.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <button>submit</button>
      </form>
      <br />
      <hr />
      <br />

      <div>
        {notes.map((note) => {
          return (
            <div key={note._id}>
              <h1>{note.title}</h1>
              <h2>{note.description}</h2>
              <div>
                <button onClick={() => editHandler(note)}>edit</button>
                <button onClick={() => handleDelete(note._id)}>delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
