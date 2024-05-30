import { useState } from 'react';
import { createBookAndFetchUser } from '../api/user-api';
import { useContext } from 'react';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';

export default function AddBookForm() {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = () => {
    console.log('hi');
    createBookAndFetchUser({ description, genre, auth, info, title, author });
  };

  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type="text"
        id="title"
      />

      <label htmlFor="title">Author</label>
      <input
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        type="text"
        id="author"
      />

      <label htmlFor="title">Description</label>
      <input
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        type="text"
        id="description"
      />

      <label htmlFor="title">Genre</label>
      <input
        value={genre}
        onChange={(e) => {
          setGenre(e.target.value);
        }}
        type="text"
        id="genre"
      />

      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
}
