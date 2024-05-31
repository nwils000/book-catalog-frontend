import { useContext, useState } from 'react';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';
import { deleteBookAndFetchUser } from '../api/user-api';
import AddBookForm from './AddBookForm';
import UpdateBookForm from './UpdateBookForm';
import '../styles/user-dashboard.css';

export default function UserDashboard() {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);

  const [selectedBookshelf, setSelectedBookshelf] = useState(null);
  const [updatingBook, setUpdatingBook] = useState(null);

  const handleDelete = (title, author) => {
    let username = info.username;
    deleteBookAndFetchUser({ auth, info, username, title, author });
  };

  const handleUpdateClick = (book) => {
    setUpdatingBook(book);
  };

  const handleSelectBookshelf = (shelf) => {
    if (selectedBookshelf && selectedBookshelf.id === shelf.id) {
      setSelectedBookshelf(null); // Deselect if already selected
    } else {
      setSelectedBookshelf(shelf); // Select new bookshelf
    }
    setUpdatingBook(null); // Reset updating book when changing bookshelf
  };

  const genreDescriptions = {
    FICTION: 'Fiction',
    NONFICTION: 'Non-Fiction',
    MYSTERY: 'Mystery',
    THRILLER: 'Thriller',
    HORROR: 'Horror',
    'SCI-FI': 'Science Fiction',
    FANTASY: 'Fantasy',
    ROMANCE: 'Romance',
    BIOGRAPHY: 'Biography',
    POETRY: 'Poetry',
    HISTORICAL: 'Historical',
    SELF_HELP: 'Self Help',
    CHILDREN: 'Children’s',
    YOUNG_ADULT: 'Young Adult',
    EDUCATION: 'Education',
    COMIC: 'Comic Book',
    GRAPHIC_NOVEL: 'Graphic Novel',
    BUSINESS: 'Business',
    TECHNOLOGY: 'Technology',
    COOKING: 'Cooking',
    TRAVEL: 'Travel',
    RELIGION: 'Religion',
    TRUE_CRIME: 'True Crime',
    SPORTS: 'Sports',
    MUSIC: 'Music',
    ART: 'Art',
  };

  return (
    <div className="dashboard">
      <p>Hi {info.userInfo.first_name}, manage your bookshelves:</p>
      {info.userInfo.bookshelves.map((shelf) => (
        <div key={shelf.id} className="bookshelf">
          <h2 onClick={() => handleSelectBookshelf(shelf)}>{shelf.title}</h2>
          {selectedBookshelf && selectedBookshelf.id === shelf.id && (
            <>
              <div className="book-list">
                {shelf.books.length > 0 ? (
                  shelf.books.map((book) => (
                    <div key={book.id} className="book-item">
                      {updatingBook && updatingBook.id === book.id ? (
                        <UpdateBookForm
                          initialBookData={updatingBook}
                          onUpdated={() => setUpdatingBook(null)}
                        />
                      ) : (
                        <div>
                          <div className="title">{book.title}</div>
                          <div className="author">{book.author}</div>
                          <div className="description">{book.description}</div>
                          <div className="genre">
                            {genreDescriptions[book.genre]}
                          </div>
                          <button
                            onClick={() =>
                              handleDelete(book.title, book.author)
                            }
                          >
                            Delete
                          </button>
                          <button onClick={() => handleUpdateClick(book)}>
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No books in this shelf.</p>
                )}
              </div>
              <AddBookForm />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
