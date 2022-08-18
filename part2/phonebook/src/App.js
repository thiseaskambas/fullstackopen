import { useState, useEffect, useCallback } from "react";
import Form from "./components/Form";
import phonebookServices from "./services/phonebook";

const Filter = ({ state, setState }) => {
  console.log("filter");
  return (
    <div>
      filter names :{" "}
      <input value={state} onChange={(e) => setState(e.target.value)} />
    </div>
  );
};

// const Persons = ({ arr, deleteHandler }) => {
//   return arr.map((el) => (
//     <div key={el.id}>
//       {el.name} - {el.number}{" "}
//       <button onClick={() => deleteHandler(el.id)}>delete</button>
//     </div>
//   ));
// };

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} - {person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("test");
  const [newNumber, setNewNumber] = useState("test");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    phonebookServices
      .getAll()
      .then((data) => setPersons(data))
      .catch((err) => console.log(err));
  }, []);

  const checkIfUnique = (field, query) => {
    return persons.find((person) => person[field] === query);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submiting");
    const nameAlreadyExists = checkIfUnique("name", newName);
    const numberAlreadyExists = checkIfUnique("number", newNumber);
    if (!newName || !newNumber) {
      return alert("Fill in the name AND the number please");
    } else if (!nameAlreadyExists && !numberAlreadyExists) {
      phonebookServices
        .addNewContact({ name: newName, number: newNumber })
        .then((data) => setPersons((prev) => [...prev, data]))
        .catch((err) => console.log(err));
    } else if (nameAlreadyExists) {
    }
    setNewName("test");
    setNewNumber("test");
  };

  const filtered =
    searchQuery.length > 0
      ? persons
      : persons.filter((el) =>
          el.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      phonebookServices.deleteContact(id).then((res) => {
        // phonebookServices
        //   .getAll()
        //   .then((data) => setPersons(data))
        //   .catch((err) => console.log(err));
        setPersons(persons.filter((el) => el.id !== id)); //avoid making server calls
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter state={searchQuery} setState={setSearchQuery} />
      <h2>Add new number</h2>
      <Form
        onSubmit={submitHandler}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      {/* <Persons arr={filtered} deleteHandler={deleteHandler} /> */}
      {filtered.map((el) => (
        <Person
          key={el.id}
          person={el}
          handleDelete={() => deleteHandler(el.id)}
        />
      ))}
    </div>
  );
};

export default App;
