import axios from "axios";
import { useState, useEffect } from "react";

const Form = ({ onSubmit, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

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
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        setPersons(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const checkIfUnique = (field, query) => {
    return persons.find((person) => person[field] === query);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const nameAlreadyExists = checkIfUnique("name", newName);
    const numberAlreadyExists = checkIfUnique("number", newNumber);
    // console.log({ nameAlreadyExists, numberAlreadyExists });
    if (newName && newNumber && !nameAlreadyExists && !numberAlreadyExists) {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ]);
    } else {
      return alert(
        `${
          (nameAlreadyExists && nameAlreadyExists.name) ||
          numberAlreadyExists.number
        } already exists!`
      );
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
