import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    inputName: '',
    inputComment: '',
    commentsList: [],
  }

  getRandomItem = list => {
    const randomIndex = Math.floor(Math.random() * list.length)
    return list[randomIndex]
  }

  onChangeNameInput = event => {
    this.setState({
      inputName: event.target.value,
    })
  }

  onChangeCommentInput = event => {
    this.setState({
      inputComment: event.target.value,
    })
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  toggleLikeButton = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {inputName, inputComment, commentsList} = this.state

    const newComment = {
      id: uuid(),
      name: inputName,
      comment: inputComment,
      timeStamp: new Date().toISOString(),
      isLiked: false,
      profileBgColor: this.getRandomItem(initialContainerBackgroundClassNames),
    }
    this.setState({
      inputName: '',
      inputComment: '',
      commentsList: [...commentsList, newComment],
    })
  }

  render() {
    const {inputName, inputComment, commentsList} = this.state

    return (
      <div className="comments-container">
        <h1 className="comments-heading">Comments</h1>
        <div className="comments-input-container">
          <form
            onSubmit={this.onAddComment}
            className="comments-input-text-container"
          >
            <p className="comments-description">
              Say something about 4.0 Technologies
            </p>
            <input
              type="text"
              className="name-input"
              placeholder="Your Name"
              onChange={this.onChangeNameInput}
              value={inputName}
            />
            <textarea
              name="comment-input"
              className="comment-input"
              placeholder="Your Comment"
              rows="6"
              cols="50"
              value={inputComment}
              onChange={this.onChangeCommentInput}
            />
            <button type="submit" className="button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments-img"
          />
        </div>
        <hr className="horizontal-line mt-20" />
        <div className="comments-count-container">
          <div className="comments-count-box">
            <p className="comments-count-num">{commentsList.length}</p>
          </div>
          <p className="comments-description">Comments</p>
        </div>
        <div className="comments-list-container">
          <ul className="comments-list-body">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentData={eachComment}
                deleteComment={this.deleteComment}
                toggleLikeButton={this.toggleLikeButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
