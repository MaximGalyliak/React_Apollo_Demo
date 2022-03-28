import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '../graqhql/queries'

const Post = () => {
  const { id } = useParams()

  const { data } = useQuery(GET_POST_BY_ID, {
    variables: { id }
  })

  if (data) {
    const { post } = data
    return (
      <div>
        <div>{post.title}</div>
        <div>{post.body}</div>
      </div>
    )
  }
  return <div>Show Post</div>
}

export default Post
