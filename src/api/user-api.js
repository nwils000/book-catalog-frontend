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
