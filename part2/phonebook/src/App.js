import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (newName && !alreadyExists(newName)) {
      setPersons([...persons, { name: newName }]);
    } else {
      return alert(`${newName} already exists!`);
    }
    setNewName("");
  };

  const alreadyExists = (input) => {
    return persons.find((person) => person.name === input);
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((el) => (
        <p key={el.name}>{el.name}</p>
      ))}
    </div>
  );
};

export default App;
