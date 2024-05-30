import { useContext } from 'react';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';
import { deleteBookAndFetchUser } from '../api/user-api';
import AddBookForm from './AddBookForm';

export default function UserDashboard() {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);

  console.log(info.userInfo.bookshelves[0]);

  const handleDelete = (title, author) => {
    let username = info.username;
    deleteBookAndFetchUser({ auth, info, username, title, author });
  };

  return (
    <>
      <p>Hi {info.userInfo.first_name}, here are your books!</p>
      <div>
        {info.userInfo.bookshelves[0] ? (
          info.userInfo.bookshelves[0].books.map((book) => {
            return (
              <div key={book.id} style={{ padding: 20 }}>
                <div>{book.title}</div>
                <div>{book.author}</div>
                <div>{book.description}</div>
                <div>{book.genre}</div>
                <button onClick={() => handleDelete(book.title, book.author)}>
                  X
                </button>
              </div>
            );
          })
        ) : (
          <div>No books to show!</div>
        )}
      </div>
      <AddBookForm />
    </>
  );
}
