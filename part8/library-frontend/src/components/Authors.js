import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [date, setDate] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <p>Loading....</p>;
  }
  const authors = result.data.allAuthors;

  const options = [];
  authors.forEach((el) => options.push({ value: el.name, label: el.name }));

  const formSubmitHandler = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: selectedOption.value, setBornTo: +date } });

    setDate("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>edit birthyear</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          name{" "}
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          birthyear{" "}
          <input
            required
            type="number"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default Authors;
