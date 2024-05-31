import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';
import { createBookshelf } from '../api/user-api';

export default function AddBookshelfForm() {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    createBookshelf({ auth, title, info });
    setTitle('');
  };

  return (
    <div className="add-bookshelf-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="shelf-title">Bookshelf Name:</label>
        <input
          id="shelf-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter new bookshelf name"
        />
        <button type="submit">Create Bookshelf</button>
      </form>
    </div>
  );
}
