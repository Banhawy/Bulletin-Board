import React from 'react'
import './App.css'

var Note = React.createClass ({
          getInitialState(){
            return {editing: false}
          },
          //Set up the styles so the note appear randomly on the screen
          componentWillMount(){
            this.style = {
              right: this.randomBetween(0, window.innerWidth - 150, 'px'),
              top: this.randomBetween(0, window.innerHeight - 150, 'px')
            }
          },
          componentDidUpdate(){
            if (this.state.editing) {
              this.refs.newText.focus()
              this.refs.newText.select
            }
          },
          shouldComponentUpdate(nextProps, nextState){
            return this.props.children !== nextProps.children || this.state !== nextState
          },
          //generate a random number coordinate on screen
          randomBetween(x, y, s){
            return (x + Math.ceil(Math.random() * (y-x))) + s
          },
          edit() {
              this.setState({editing: true})
            },
            save() {
              this.props.onChange(this.refs.newText.value, this.props.id)
              this.setState({editing: false})
            },
            remove() {
              this.props.onRemove(this.props.id)
            },
            renderForm(){
              return (
                <div className="note"
                      style={this.style}>
                  <textarea ref="newText" cols="20" rows="10"
                            defaultValue={this.props.children}></textarea>
                  <button onClick={this.save}>Save</button>
                </div>
              )
            },
            renderDisplay(){
              return (
              <div className="note"
                   style={this.style}>
              <p>{this.props.children}</p>
              <span>
              <button onClick={this.edit}>EDITT</button>
              <button onClick={this.remove}>X</button>
              </span>
              </div>
            )
            },
          render(){
            return (<ReactDraggable>
              {
                (this.state.editing) ? this.renderForm()
                                   : this.renderDisplay()
              }
                    </ReactDraggable>)
        }
      })

export default Note
