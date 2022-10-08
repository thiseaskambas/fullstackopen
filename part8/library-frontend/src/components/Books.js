import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <p>Loading....</p>;
  }
  const books = result.data.allBooks;

  const genres = [];
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });

  const booksToShow = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

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
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={(e) => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
