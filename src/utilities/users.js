import { fetch, ENDPOINT } from '../utilities/fetch'

const getUsers = async (uid, token) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `{allUsers(where: {role: 0}) { id firstName lastName fullName email mobileNumber gender birthdate country region city school bio role matchesCount imageUrl {url}}}`
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.allUsers
}

const getUser = async (id, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `query AllUsers($id: Int)
        {allUsers(where: {
          id: $id
        }) {
            id
            firstName
            lastName
            email
            gender
            mobileNumber
            country
            region
            city
            school
            bio
            age
            birthdate
            imageUrl {
              url
              signedId
            }
        }}`,
      variables: {
        id
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.allUsers[0]
}

const getFilteredUsers = async (id, genderInterests, token, uid, first, skip) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `query AllUsers($id: Int, $genderInterests: String, $first: Int, $skip: Int)
        {allUsers(where: {
          idFilter: $id
          genderInterests: $genderInterests
        }, first: $first, skip: $skip) {
            id
            firstName
            lastName
            email
            gender
            mobileNumber
            country
            region
            city
            school
            bio
            age
            birthdate
            imageUrl {
              url
              signedId
            }
        }}`,
      variables: {
        id,
        genderInterests,
        first,
        skip
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.allUsers
}

const getMatchedUsers = async (matchedWithId, token, uid, first, skip) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `query AllUsers($matchedWithId: Int, $first: Int, $skip: Int)
        {allUsers(where: {
          matchedWithId: $matchedWithId
        }, first: $first, skip: $skip) {
            id
            firstName
            lastName
            email
            gender
            mobileNumber
            birthdate
            imageUrl {
              url
              signedId
            }
        }}`,
      variables: {
        matchedWithId,
        first,
        skip
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.allUsers
}

const updateUser = async (user, uid, token, userId) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation UserUpdate($firstName: String!, $lastName: String!, $email: String!, $password: String, $bio: String!, $school: String, $mobileNumber: String!, $image: [Upload!], $userId: String)
                  {
                      userUpdate(input: {
                          userId: $userId
                          userInput: {
                              firstName: $firstName,
                              lastName: $lastName,
                              email: $email,
                              password: $password,
                              mobileNumber: $mobileNumber
                              bio: $bio,
                              school: $school,
                              image: $image
                          }
                      }) {
                          user {
                              id
                              firstName
                              lastName
                              email
                              mobileNumber
                              bio
                              school
                              imageUrl {
                                url
                                signedId
                              }
                          }
                      }
                  }`,
      variables: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        mobileNumber: user.mobileNumber,
        school: user.school,
        bio: user.bio,
        image: user.image,
        userId
      }
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: token,
        uid: uid
      }
    }
  )
  return resp
}

const imageDelete = async (signedId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation ImageDelete($signedId: ID!)
                  {
                      imageDelete(input: {
                          id: $signedId
                      }) {
                          status
                      }
                  }`,
      variables: {
        signedId
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        token: token,
        uid: uid
      }
    }
  )
  return resp.data.data.imageDelete
}

const deleteUser = async (id, uid, token) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation UserDelete($id: ID!)
                  {
                      userDelete(input: {
                          userInput: {
                              id: $id
                          }
                      }) {
                          user {
                            id
                            firstName
                            lastName
                            email
                            mobileNumber
                            bio
                            school
                            imageUrl {
                              url
                              signedId
                            }
                          }
                      }
                  }`,
      variables: {
        id: id
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp
}

export { getUsers, getFilteredUsers, getMatchedUsers, getUser, updateUser, imageDelete, deleteUser }
