import { useQuery } from "@apollo/client";
import { useState /* useEffect */ } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneForm from "./components/PhoneForm";
import { ALL_PERSONS } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000,
  });

  // useEffect(() => {}, [result.data]);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  if (result.loading) {
    return <div>loading...</div>;
  }
  console.log(result.data.allPersons);

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
