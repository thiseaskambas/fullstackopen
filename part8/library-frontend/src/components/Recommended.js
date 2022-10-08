import { useQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGED_USER } from "../queries";

const Recommended = (props) => {
  const user = useQuery(LOGGED_USER);

  const result = useQuery(ALL_BOOKS, {
    skip: !user.data?.me.favouriteGenre,
    variables: { genre: user.data?.me.favouriteGenre },
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
      <h2>Recommended books</h2>

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
