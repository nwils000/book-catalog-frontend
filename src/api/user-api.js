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
    },
  })
    .then((response) => {
      console.log('Fetch user response: ', response);
      return response;
    })
    .catch((error) => console.log('Error: ', error));
};

export const deleteBook = async ({ auth, username, title, author }) => {
  console.log('Access Token:', auth.accessToken);
  console.log('Base URL:', baseUrl);
  await axios({
    method: 'put',
    url: `${baseUrl}/user-delete-book/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    data: {
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

export const deleteBookAndFetchUser = async ({
  auth,
  info,
  username,
  title,
  author,
}) => {
  try {
    await deleteBook({ auth, username, title, author });
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
}) => {
  try {
    await addBookToBookshelf({ auth, info, title, author, genre, description });
    await fetchUser({ auth, info });
  } catch (error) {
    console.log('Error: ', error);
  }
};
