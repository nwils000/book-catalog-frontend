import React, { useContext, useState } from 'react';
import { addExistingBookToBookshelfAndFetchUser } from '../api/user-api';
import { AuthContext } from '../context/authContext';
import { UserInfoContext } from '../context/userInfoContext';

export default function SearchBooks({ books, shelf_title }) {
  const { auth } = useContext(AuthContext);
  const { info } = useContext(UserInfoContext);
  const [filter, setFilter] = useState('');

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase()) ||
      book.genre.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleBookClick = (book) => {
    let bookId = book.id;
    addExistingBookToBookshelfAndFetchUser({ auth, bookId, info, shelf_title });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search books"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredBooks.map((book, index) => (
        <div key={index} onClick={() => handleBookClick(book)}>
          {book.title} - {book.author} - {book.genre}
        </div>
      ))}
    </div>
  );
}
