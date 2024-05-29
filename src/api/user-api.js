import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

export const createUser = ({ username, password, firstName, lastName }) => {
  axios({
    mathod: 'post',
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
