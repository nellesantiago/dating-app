import { fetch, ENDPOINT } from '../utilities/fetch'

const createMessage = async (userId, matchId, content, token, uid) => {
  const resp = await fetch.post(
    ENDPOINT,
    {
      query: `mutation MessageCreate($userId: Int!, $matchId: Int!, $content: String!) {
                messageCreate(input: {
                    messageInput: {
                        userId: $userId
                        matchId: $matchId
                        content: $content
                    }
                }) {
                    message {
                        id
                        content
                    }
                }
            }`,
      variables: {
        userId,
        matchId,
        content
      }
    },
    {
      headers: { 'Content-Type': 'application/json', token: token, uid: uid }
    }
  )
  return resp.statusText
}

export { createMessage }
