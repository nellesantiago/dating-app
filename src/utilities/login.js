import { fetch, ENDPOINT } from '../utilities/fetch'

const login = async (email, password) => {
    const resp = await fetch.post(
      ENDPOINT,
      {
        query: `mutation UserSignIn($email: String!, $password: String!)
          {userSignIn(input: {
            email: $email,
            password: $password
          }) {
            token
            user {
              id
              firstName
              lastName
              email
              gender
              role
              fullName
            }
          }}`,
        variables: {
          email: email,
          password: password,
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return resp.data.data.userSignIn;
  };

export { login }