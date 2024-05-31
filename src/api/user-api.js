import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

export const createUser = ({ username, password, firstName, lastName }) => {
  axios({
    method: 'post',
    url: `${baseUrl}/create-user/`,
    data: {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
    },
  })
    .then((response) => {
      console.log('Create User Response: ', response);
    })
    .catch((error) => console.log('error: ', error));
};

export const getToken = async ({ auth, username, password }) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/token/`,
      data: {
        username,
        password,
      },
    });
    console.log('authhhh', auth);

    auth.setAccessToken(response.data.access);
    console.log('Get token response', response);
    return response;
  } catch (error) {
    console.log('ERROR: ', error);
    throw error;
  }
};

export const fetchUser = async ({ auth, info }) => {
  console.log('Access Token:', auth.accessToken);
  console.log('Base URL:', baseUrl);
  await axios({
    method: 'get',
    url: `${baseUrl}/profile/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  })
    .then((response) => {
      info.setUserInfo(response.data);
      console.log('Fetch user response: ', response);
    })
    .catch((error) => console.log('Error: ', error));
};

export const addBookToBookshelf = async ({
  auth,
  info,
  title,
  author,
  description,
  genre,
  shelf_title,
}) => {
  console.log('Access Token:', auth.accessToken);
  console.log('Base URL:', baseUrl);
  console.log('info, ', info);
  let username = info.username;
  await axios({
    method: 'post',
    url: `${baseUrl}/user-create-book/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      title,
      author,
      description,
      genre,
      username,
      shelf_title,
    },
  })
    .then((response) => {
      console.log('Fetch user response: ', response);
      return response;
    })
    .catch((error) => console.log('Error: ', error));
};

export const createBookshelf = async ({ auth, title }) => {
  console.log('Access Token:', auth.accessToken);
  console.log('Base URL:', baseUrl);
  await axios({
    method: 'post',
    url: `${baseUrl}/user-create-bookshelf/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      title,
    },
  })
    .then((response) => {
      console.log('Fetch user response: ', response);
      return response;
    })
    .catch((error) => console.log('Error: ', error));
};

export const deleteBook = async ({
  auth,
  username,
  title,
  author,
  shelf_title,
}) => {
  console.log('Access Token:', auth.accessToken);
  console.log('Base URL:', baseUrl);
  await axios({
    method: 'put',
    url: `${baseUrl}/user-delete-book/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      shelf_title,
      title,
      author,
      username,
    },
  })
    .then((response) => {
      console.log('Fetch user response: ', response);
      return response;
    })
    .catch((error) => console.log('Error: ', error));
};

export const deleteShelf = async ({ shelf_title, auth }) => {
  console.log('Access Token:', auth.accessToken);
  console.log('Base URL:', baseUrl);
  await axios({
    method: 'delete',
    url: `${baseUrl}/user-delete-shelf/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      shelf_title,
    },
  })
    .then((response) => {
      console.log('Fetch user response: ', response);
      return response;
    })
    .catch((error) => console.log('Error: ', error));
};

export const updateBook = async ({
  auth,
  prev_title,
  title,
  author,
  description,
  genre,
}) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${baseUrl}/user-update-book/`,
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      data: {
        prev_title,
        title,
        author,
        description,
        genre,
      },
    });
    console.log('Update Book Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getAllBooks = ({ books }) => {
  axios({
    method: 'get',
    url: `${baseUrl}/get-all-books/`,
  })
    .then((response) => {
      books.setAllBooks(response.data);
    })
    .catch((error) => {
      console.log('ERROR: ', error);
      throw error;
    });
};

export const addExistingBookToBookshelf = async ({
  auth,
  bookId,
  shelf_title,
}) => {
  console.log('Access Token:', auth.accessToken);
  console.log('Base URL:', baseUrl);
  await axios({
    method: 'post',
    url: `${baseUrl}/add-existing-book-to-shelf/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
      id: bookId,
      shelf_title,
    },
  })
    .then((response) => {
      console.log('Fetch user response: ', response);
      return response;
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
};

export const deleteBookAndFetchUser = async ({
  auth,
  info,
  username,
  title,
  author,
  shelf_title,
}) => {
  try {
    await deleteBook({ auth, username, title, author, shelf_title });
    await fetchUser({ auth, info });
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const deleteShelfAndFetchUser = async ({ auth, info, shelf_title }) => {
  try {
    await deleteShelf({ shelf_title, auth });
    await fetchUser({ auth, info });
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const createBookAndFetchUser = async ({
  description,
  genre,
  auth,
  info,
  title,
  author,
  shelf_title,
}) => {
  try {
    await addBookToBookshelf({
      shelf_title,
      auth,
      info,
      title,
      author,
      genre,
      description,
    });
    await fetchUser({ auth, info });
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const createBookshelfAndFetchUser = async ({ auth, title, info }) => {
  try {
    await createBookshelf({ auth, title });
    await fetchUser({ auth, info });
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const updateBookAndFetchUser = async ({
  description,
  genre,
  auth,
  info,
  title,
  author,
  prev_title,
}) => {
  try {
    await updateBook({ prev_title, auth, title, author, description, genre });
    await fetchUser({ auth, info });
  } catch (error) {
    console.log('Error: ', error);
  }
};

export const addExistingBookToBookshelfAndFetchUser = async ({
  bookId,
  auth,
  info,
  shelf_title,
}) => {
  try {
    await addExistingBookToBookshelf({ auth, bookId, shelf_title });
    await fetchUser({ auth, info });
  } catch (error) {
    console.log('Error: ', error);
  }
};
