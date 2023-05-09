import { fetch, ENDPOINT } from '../utilities/fetch'

const register = async (user, interests) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation UserCreate($firstName: String!, $lastName: String!, $email: String!, $password: String!, $mobileNumber: String!, $birthdate: String!, $gender: Gender!, $country: String, $region: String, $city: String, $school: String, $bio: String!, $interests: String!, $image: [Upload!])
              {
                  userCreate(input: {
                      userInput: {
                          firstName: $firstName,
                          lastName: $lastName,
                          email: $email,
                          password: $password,
                          mobileNumber: $mobileNumber,
                          birthdate: $birthdate,
                          gender: $gender,
                          country: $country,
                          region: $region,
                          city: $city,
                          school: $school,
                          bio: $bio,
                          image: $image,
                        }
                        interests: $interests
                  }) {
                      user {
                          id
                          firstName
                          lastName
                          email
                      }
                  }
              }`,
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        mobileNumber: user.mobileNumber,
        birthdate: user.birthdate,
        gender: user.gender,
        country: user.country,
        region: user.region,
        city: user.city,
        school: user.school,
        bio: user.bio,
        image: user.image,
        interests: interests
      }
    },
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
  return resp
}

export { register }
