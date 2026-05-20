import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleDelete = async (noteId) => {
    const res = await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
    fetchNotes();
    console.log(res.data);
  };

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (note) => {
    setFormData({
      title: note.title,
      description: note.description,
    });

    setEditingId(note._id);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (editingId) {
      // =========================
      // Update note
      // =========================

      axios.patch(`http://localhost:3000/api/notes/${editingId}`, formData).then((res) => {
        console.log(res.data);
        fetchNotes();
        setEditingId(null);
      });
    } else {
      // =========================
      // create note
      // =========================

      axios.post(`http://localhost:3000/api/notes/`, formData).then((res) => {
        fetchNotes();
        console.log(res.data);
      });
    }

    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <>
      <form className="note-create-form" onSubmit={submitHandler}>
        <input
          name="title"
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        />
        <button>create note</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleDelete(note._id)}>delete</button>
              <button onClick={() => handleEdit(note)}>edit</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
