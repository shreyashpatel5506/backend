import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote'; // Assuming this is a component for adding notes
import { useNavigate } from 'react-router-dom';

const Notes = ({ showAlert }) => {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { notes, getnote, editNote, addNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnote();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: ""
  });

  const [showAddNote, setShowAddNote] = useState(false);

  // New state to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle note update when edit button is clicked
  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title || "",
      edescription: currentNote.description || "",
      etag: currentNote.tag || ""
    });
    
    setIsModalOpen(true); // Open the modal
  };

  const handleClick = () => {
    if (note.etitle && note.edescription) {
      // Update note
      editNote(note.id, note.etitle, note.edescription, note.etag);
      showAlert("Note updated successfully", "success");

      setIsModalOpen(false); // Close the modal after updating
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleNoteAdded = () => {
    setShowAddNote(false);
    showAlert("Note added successfully", "success");
  };

  return (
    <>
      {!showAddNote && (
        <i
          className="fa-solid fa-plus"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            fontSize: '50px',
            backgroundColor: '#107a5a',
            color: 'white',
            borderRadius: '50%',
            padding: '20px',
            cursor: 'pointer',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
          }}
          onClick={() => setShowAddNote(true)} // Show AddNote component
        ></i>
      )}

      {showAddNote && <AddNote showAlert={showAlert} onNoteAdded={handleNoteAdded} />}

      {/* Modal for editing notes */}
      {isModalOpen && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
          style={{ display: 'block' }} // Display the modal
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)} // Close the modal
                >
                  Close
                </button>
                <button
                  disabled={note.etitle.length < 5 || note.edescription.length < 5}
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Displaying Notes */}
      <div className="row my-3">
        <h2>Your Notes</h2>

        {notes.length === 0 ? (
          <p>No notes to display</p>
        ) : (
          notes.map((note) => (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
