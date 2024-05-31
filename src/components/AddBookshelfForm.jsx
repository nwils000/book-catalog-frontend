import React, { useState, useContext } from 'react';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';
import { createBookshelfAndFetchUser } from '../api/user-api';

export default function AddBookshelfForm() {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');

  return (
    <div className="add-bookshelf-form">
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
      <button
        className="other-button"
        onClick={(e) => {
          createBookshelfAndFetchUser({ auth, title, info });
          setTitle('');
        }}
      >
        Create Bookshelf
      </button>
    </div>
  );
}
