import axios from "axios";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import phonebookServices from "./services/phonebook";

const Filter = ({ state, setState }) => {
  return (
    <div>
      filter names :{" "}
      <input value={state} onChange={(e) => setState(e.target.value)} />
    </div>
  );
};

const Persons = ({ arr }) => {
  return arr.map((el) => (
    <p key={el.id}>
      {el.name} - {el.number}
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
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
    const nameAlreadyExists = checkIfUnique("name", newName);
    const numberAlreadyExists = checkIfUnique("number", newNumber);
    if (!newName || !newNumber) {
      alert("Fill in the name AND the number please");
    } else if (!nameAlreadyExists && !numberAlreadyExists) {
      phonebookServices
        .addNewContact({ name: newName, number: newNumber })
        .then((data) => setPersons((prev) => [...prev, data]))
        .catch((err) => console.log(err));
    }
    setNewName("");
    setNewNumber("");
  };

  const filtered = persons.filter((el) =>
    el.name.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())
  );

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
      <Persons arr={filtered} />
    </div>
  );
};

export default App;
