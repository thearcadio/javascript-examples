import React, { Component } from 'react'
import FaTrash from 'react-icons/lib/fa/trash'

class Comment extends Component {
	constructor(props) {
		super(props)
		this.removeComment = this.removeComment.bind(this)
	}

	removeComment() {
		this.props.onRemoveComment(this.props.index)
		//console.log("remove comment has been clicked")
	}

	render() {
		return (
			<div className="comment">
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.removeComment} id="removeComment"><FaTrash /></button>
				</span>
			</div>
		)
	}
}

export default Comment
