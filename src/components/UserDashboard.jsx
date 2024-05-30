import { useContext } from 'react';
import { UserInfoContext } from '../context/userInfoContext';

export default function UserDashboard() {
  const { info } = useContext(UserInfoContext);
  console.log(info.userInfo.bookshelves[0]);

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
              </div>
            );
          })
        ) : (
          <div>No books to show!</div>
        )}
      </div>
    </>
  );
}
