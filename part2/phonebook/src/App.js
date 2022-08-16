import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const checkIfUnique = (field, query) => {
    return persons.find((person) => person[field] === query);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const nameAlreadyExists = checkIfUnique("name", newName);
    const numberAlreadyExists = checkIfUnique("number", newNumber);
    // console.log({ nameAlreadyExists, numberAlreadyExists });
    if (newName && newNumber && !nameAlreadyExists && !numberAlreadyExists) {
      setPersons([...persons, { name: newName, number: newNumber }]);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler}>
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
      <h2>Numbers</h2>
      {persons.map((el) => (
        <p key={el.name}>
          {el.name} - {el.number}
        </p>
      ))}
    </div>
  );
};

export default App;
