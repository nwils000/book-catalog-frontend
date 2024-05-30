import { useState, useContext } from 'react';
import { createBookAndFetchUser } from '../api/user-api';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';
import '../styles/user-dashboard.css';

export default function AddBookForm() {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = () => {
    createBookAndFetchUser({ description, genre, auth, info, title, author });
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
    <div className="add-book-form">
      <div className="label-input-wrapper">
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
        />
      </div>
      <div className="label-input-wrapper">
        <label htmlFor="author">Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          id="author"
        />
      </div>
      <div className="label-input-wrapper">
        <label htmlFor="description">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          id="description"
        />
      </div>
      <div className="label-input-wrapper">
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
      </div>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
}
