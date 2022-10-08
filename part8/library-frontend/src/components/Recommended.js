import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommended = (props) => {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: "mystery" },
  });
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <p>Loading....</p>;
  }
  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
