import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentData, deleteComment, toggleLikeButton} = props
  const {id, name, profileBgColor, comment, timeStamp, isLiked} = commentData
  const profileLetter = name[0].toUpperCase()
  const timeStampInText = formatDistanceToNow(new Date(timeStamp))
  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onDeleteComment = () => {
    deleteComment(id)
  }

  const onToggleLikeButton = () => {
    toggleLikeButton(id)
  }

  return (
    <li className="item-container">
      <div className="comment-text-box">
        <div className={`profile-bg ${profileBgColor}`}>
          <p className="profile-letter margin-0">{profileLetter}</p>
        </div>
        <div className="comment-content-container">
          <div className="comment-name-container">
            <p className="profile-name margin-0">{name}</p>
            <p className="comment-time margin-0">{timeStampInText}</p>
          </div>
          <p className="comment-text">{comment}</p>
        </div>
      </div>
      <div className="comment-action-container">
        <button type="button" className="like-btn" onClick={onToggleLikeButton}>
          <img src={likeImg} alt="like" className="like-img" />
          <p className={`like-text ${isLiked ? 'liked-text' : ''}`}>Like</p>
        </button>
        <button
          type="button"
          className="delete-btn"
          data-testid="delete"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
      <hr className="horizontal-line mt-0" />
    </li>
  )
}

export default CommentItem
