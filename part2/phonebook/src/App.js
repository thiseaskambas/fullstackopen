import { useState, useEffect } from "react";
import Form from "./components/Form";
import phonebookServices from "./services/phonebook";
import Notification from "./components/Notification";

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
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

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
        .then(() => {
          setNotification({
            type: "success",
            text: `Successfully added to phonebook`,
          });
          setTimeout(() => {
            setNotification({
              type: null,
              message: null,
            });
          }, 15000);
        })
        .catch((err) => console.log(err.message));
    } else if (nameAlreadyExists) {
      if (
        window.confirm(
          `${nameAlreadyExists.name} already exists. Do you want to update the number?`
        )
      ) {
        const updatedContact = { ...nameAlreadyExists, number: newNumber };
        phonebookServices.updateContact(updatedContact).then((res) => {
          setPersons(
            persons.map((el) =>
              el.id !== updatedContact.id ? el : updatedContact
            )
          );
        });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const filtered =
    searchQuery.length === 0
      ? persons
      : persons.filter((el) =>
          el.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

  const deleteHandler = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      phonebookServices
        .deleteContact(person.id)
        .then((res) => {
          // phonebookServices
          //   .getAll()
          //   .then((data) => setPersons(data))
          //   .catch((err) => console.log(err));
          setPersons(persons.filter((el) => el.id !== person.id)); //avoid making server calls
        })
        .catch((err) => {
          setNotification({ type: "error", text: `${err.message}` });
          setTimeout(() => {
            setNotification({
              type: null,
              message: null,
            });
          }, 15000);
        });
    }
  };

  return (
    <div>
      <Notification message={notification} />
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
          handleDelete={() => deleteHandler(el)}
        />
      ))}
    </div>
  );
};

export default App;
