import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const Form = ({ onSubmit }) => {
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

  const filtered = persons.filter((el) =>
    el.name.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())
  );

  const Filter = () => {
    return (
      <div>
        filter names :{" "}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    );
  };

  const Persons = () => {
    return filtered.map((el) => (
      <p key={el.id}>
        {el.name} - {el.number}
      </p>
    ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <h2>Add new number</h2>
      <Form onSubmit={submitHandler} />
      <h2>Numbers</h2>
      <Persons />
    </div>
  );
};

export default App;
