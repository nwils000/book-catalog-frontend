import { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '../context/userInfoContext';
import { AuthContext } from '../context/authContext';
import { AllBooksContext } from '../context/allBooksContext';
import { deleteBookAndFetchUser } from '../api/user-api';
import { deleteShelfAndFetchUser } from '../api/user-api';
import { getAllBooks } from '../api/user-api';
import AddBookForm from './AddBookForm';
import UpdateBookForm from './UpdateBookForm';
import AddBookshelfForm from './AddBookshelfForm';
import SearchBooks from './SearchBooks';
import { MdDelete } from 'react-icons/md';
import '../styles/user-dashboard.css';

export default function UserDashboard() {
  const { info } = useContext(UserInfoContext);
  const { auth } = useContext(AuthContext);
  const { books } = useContext(AllBooksContext);

  const [selectedBookshelf, setSelectedBookshelf] = useState(null);
  const [updatingBook, setUpdatingBook] = useState(null);
  const [displayedBooks, setDisplayedBooks] = useState(
    books.allBooks ? books.allBooks : []
  );
  const [searchingDatabase, setSearchingDatabase] = useState(false);
  const [creatingBook, setCreatingBook] = useState(false);

  useEffect(() => {
    getAllBooks({ books });
  }, []);

  useEffect(() => {
    if (books.allBooks) {
      console.log(books.allBooks);
      setDisplayedBooks(books.allBooks);
    }
  }, [books.allBooks]);

  const handleDelete = (title, author, shelf_title) => {
    let username = info.username;
    deleteBookAndFetchUser({
      auth,
      info,
      username,
      title,
      author,
      shelf_title,
    });
  };

  const handleUpdateClick = (book) => {
    setUpdatingBook(book);
  };

  const handleSelectBookshelf = (shelf) => {
    if (selectedBookshelf && selectedBookshelf.id === shelf.id) {
      setSelectedBookshelf(null);
    } else {
      setSelectedBookshelf(shelf);
    }
    setUpdatingBook(null);
  };

  const handleDeleteSelectBookshelf = (shelf) => {
    let shelf_title = shelf.title;
    deleteShelfAndFetchUser({ auth, info, shelf_title });
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
      <p style={{ fontSize: '2rem' }}>
        Hi{' '}
        <span style={{ fontWeight: 'bold' }}>{info.userInfo.first_name}</span>,
        lets manage your bookshelves:
      </p>
      {<AddBookshelfForm />}
      {info.userInfo.bookshelves.map((shelf) => (
        <div key={shelf.id} className="bookshelf">
          <div style={{ position: 'relative' }}>
            <h2
              style={{ display: 'inline' }}
              onClick={() => handleSelectBookshelf(shelf)}
            >
              <span
                style={{ fontSize: '.7rem', position: 'relative', bottom: 5 }}
              >
                {'Open/Close Shelf =>'}
              </span>{' '}
              {shelf.title}
            </h2>
            <p
              className="trashcan"
              style={{
                display: 'inline',
                marginBottom: 0,
                position: 'relative',
                top: 3,
                left: 5,
              }}
              onClick={() => handleDeleteSelectBookshelf(shelf)}
            >
              <MdDelete />
            </p>
          </div>
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
                              handleDelete(book.title, book.author, shelf.title)
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
              <button
                className="other-button"
                onClick={() => {
                  setCreatingBook(false);
                  setSearchingDatabase(true);
                }}
              >
                Select book from database
              </button>
              <button
                className="other-button"
                onClick={() => {
                  setSearchingDatabase(false);
                  setCreatingBook(true);
                }}
              >
                Add book to database/bookshelf
              </button>
              {creatingBook && (
                <AddBookForm shelf_title={selectedBookshelf.title} />
              )}
              {searchingDatabase && (
                <SearchBooks
                  shelf_title={selectedBookshelf.title}
                  books={displayedBooks}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
