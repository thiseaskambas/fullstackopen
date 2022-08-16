import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Hello Greece", number: "0030-12345679" },
    { name: "Buzz Lightyear", number: "000-1111111" },
    { name: "Harry Potter", number: "0033-121212" },
    { name: "Lord Voldemort", number: "0033-6666666" },
    { name: "Aragorn", number: "000-848548512" },
    { name: "Hermione Greinger", number: "000-848548512" },
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

  const filtered = persons.filter((el) =>
    el.name.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter names :{" "}
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h2>Add new number</h2>
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
      {filtered.map((el) => (
        <p key={el.name}>
          {el.name} - {el.number}
        </p>
      ))}
    </div>
  );
};

export default App;
