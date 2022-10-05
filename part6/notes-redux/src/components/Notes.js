import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  return (
    <Table striped>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>
              <Note
                key={note.id}
                note={note}
                handleClick={() => dispatch(toggleImportanceOf(note.id))}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Notes;
