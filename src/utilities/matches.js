import { fetch, ENDPOINT } from '../utilities/fetch'

const getUserMatches = async (userId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `query AllMatches($userId: Int)
          {allMatches(where: {
            status: 1
            fromUserId: $userId
            OR: {
                status: 1
                toUserId: $userId
            }
          }) {
              id
              name
              latestMessage {
                content
                sender
                createdAt
              }
              users {
                id
                fullName
                imageUrl {
                    url
                }
              }
          }}`,
      variables: {
        userId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.allMatches
}

const getMatch = async (matchId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `query AllMatches($matchId: Int)
            {allMatches(where: {
             id : $matchId
            }) {
                name
                users {
                    fullName
                    firstName
                    imageUrl {
                        url
                    }
                }
            }}`,
      variables: {
        matchId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.allMatches[0]
}

const getUsersMatchId = async (fromId, toId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `query AllMatches($fromId: Int, $toId: Int)
              {allMatches(where: {
                fromUserId: $fromId
                toUserId: $toId
                OR: {
                    fromUserId: $toId
                    toUserId: $fromId
                }
              }) {
                  id
              }}`,
      variables: {
        fromId,
        toId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  console.log(resp)
  return resp.data.data.allMatches[0].id
}

const getMatchMessages = async (matchId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `query AllMatches($matchId: Int)
              {allMatches(where: { id: $matchId}) {
                  messages {
                    content
                    sender
                  }
              }}`,
      variables: {
        matchId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.allMatches
}

const like = async (userId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation Like($userId: Int!)
                  {
                    like(input: { userId: $userId }) {
                        match {
                            id
                            status
                        }
                  }
                }`,
      variables: {
        userId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.like
}

const dislike = async (userId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation Dislike($userId: Int!)
                    {
                      dislike(input: { userId: $userId }) {
                        blacklist {
                            id
                        }
                    }
                  }`,
      variables: {
        userId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  console.log(resp)
  return resp.data.data.dislike
}

const likeCheck = async (userId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation LikeCheck($userId: Int!)
                      {
                        likeCheck(input: { id: $userId }) {
                              status
                      }
                    }`,
      variables: {
        userId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.data.data.likeCheck.status
}

const likeBack = async (matchId, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation LikeBack($matchId: Int!)
                      {
                        likeBack(input: { matchId: $matchId }) {
                            match {
                              id
                              status
                            }
                      }
                    }`,
      variables: {
        matchId
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp
}

export { getUserMatches, getUsersMatchId, getMatchMessages, like, dislike, likeCheck, likeBack, getMatch }
