const NewNoteForm = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default NewNoteForm;
