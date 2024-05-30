import { useState, useContext } from 'react';
import { updateBookAndFetchUser } from '../api/user-api';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';

export default function UpdateBookForm({ initialBookData, onUpdated }) {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);

  const [title, setTitle] = useState(initialBookData.title);
  const [author, setAuthor] = useState(initialBookData.author);
  const [description, setDescription] = useState(initialBookData.description);
  const [genre, setGenre] = useState(initialBookData.genre);

  const handleSubmit = async () => {
    let prev_title = initialBookData.title;
    try {
      await updateBookAndFetchUser({
        prev_title,
        title,
        author,
        description,
        genre,
        auth,
        info,
      });
      onUpdated();
    } catch (error) {
      console.error('Failed to update the book:', error);
    }
  };

  const genres = [
    { label: 'Fiction', value: 'FICTION' },
    { label: 'Non-Fiction', value: 'NONFICTION' },
    { label: 'Mystery', value: 'MYSTERY' },
    { label: 'Thriller', value: 'THRILLER' },
    { label: 'Horror', value: 'HORROR' },
    { label: 'Science Fiction', value: 'SCI-FI' },
    { label: 'Fantasy', value: 'FANTASY' },
    { label: 'Romance', value: 'ROMANCE' },
    { label: 'Biography', value: 'BIOGRAPHY' },
    { label: 'Poetry', value: 'POETRY' },
    { label: 'Historical', value: 'HISTORICAL' },
    { label: 'Self Help', value: 'SELF_HELP' },
    { label: 'Children’s', value: 'CHILDREN' },
    { label: 'Young Adult', value: 'YOUNG_ADULT' },
    { label: 'Education', value: 'EDUCATION' },
    { label: 'Comic Book', value: 'COMIC' },
    { label: 'Graphic Novel', value: 'GRAPHIC_NOVEL' },
    { label: 'Business', value: 'BUSINESS' },
    { label: 'Technology', value: 'TECHNOLOGY' },
    { label: 'Cooking', value: 'COOKING' },
    { label: 'Travel', value: 'TRAVEL' },
    { label: 'Religion', value: 'RELIGION' },
    { label: 'True Crime', value: 'TRUE_CRIME' },
    { label: 'Sports', value: 'SPORTS' },
    { label: 'Music', value: 'MUSIC' },
    { label: 'Art', value: 'ART' },
  ];

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="title"
      />

      <label htmlFor="author">Author</label>
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        type="text"
        id="author"
      />

      <label htmlFor="description">Description</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        id="description"
      />

      <label htmlFor="genre">Genre</label>
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        id="genre"
      >
        {genres.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Update Book</button>
    </div>
  );
}
