import React, { Component } from 'react'
import Comment from './Comment'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'
import FaPlus from 'react-icons/lib/fa/plus'

class Note extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
			checked: false,
			comments: []
		}
		this.editNote = this.editNote.bind(this)
		this.removeNote = this.removeNote.bind(this)
		this.saveNote = this.saveNote.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
		this.handleCheckbox = this.handleCheckbox.bind(this)
		this.noteAppearance = this.noteAppearance.bind(this)
		this.addComment = this.addComment.bind(this)
		this.eachComment = this.eachComment.bind(this)
		this.removeComment = this.removeComment.bind(this)
	}
	editNote() {
		this.setState({
			editing: true
		})
	}

	removeNote() {
		this.props.onRemoveNote(this.props.index)
	}

	removeComment(id) {
		//console.log('removing comment at', id)
		this.setState(prevState => ({
			comments: prevState.comments.filter(comment => comment.id !== id)
		}))
	}

	saveNote(e) {
		e.preventDefault()
		this.props.onChangeNote(this._newText.value, this.props.index)
		this.setState({
			editing: false
		})
	}

	handleCheckbox(){
		//console.log("Clicked Checkbox!");
		this.setState({
			checked: ! this.state.checked //need this even though we have this above
		})
	}

	renderForm() {
		return (
			<div className="note">
				<form onSubmit={this.saveNote}>
					<textarea ref={input => this._newText = input}/>
					<button id="save"><FaFloppyO /></button>
				</form>
			</div>
		)
	}

	noteAppearance(){
		var styleNoteBG = {backgroundColor: "yellow"}
		if(this.state.checked) {styleNoteBG = {backgroundColor: "lightblue"}}
		return(styleNoteBG)
	}

	addComment() {
		//console.log("comment clicked!")
		this.setState(prevState => ({
			comments: [
				...prevState.comments,
				{
					comment: "My Comment",
					id: this.nextCommentId()
				}
			]
		}))
	}

	nextCommentId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}

	eachComment(comment) {
		return (
			<Comment key={comment.id}
				  index={comment.id}
				  onRemoveComment={this.removeComment}>
				  {comment.comment} {comment.id}
			</Comment>
		)
	}

	renderDisplay() {
		var styleToUse = {...this.noteAppearance()}
		return (
			<div>
				<div className="note" style={styleToUse}>
					<p>{this.props.children}</p>
					<p> <input type = "checkbox" checked = {this.checked} onChange = {this.handleCheckbox}/> Done </p>
					<span>
						<button onClick={this.addComment} id="add"><FaPlus /></button>
						<button onClick={this.editNote} id="edit"><FaPencil /></button>
						<button onClick={this.removeNote} id="remove"><FaTrash /></button>
					</span>
				</div>
				{this.state.comments.map(this.eachComment)}
			</div>
		)
	}
	render() {
		return this.state.editing ? this.renderForm() : this.renderDisplay()
	}

}

export default Note
