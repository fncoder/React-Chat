import React from 'react';
import ReactDOM from 'react-dom';
import Send from './send.js'
import Users from './users.js'
import Messages from './messages.js'

const app = document.querySelector('#app')

class ChatApp extends React.Component {
  constructor () {
    super()
    
    this.state = {
      inputValue: '',
      messages: [],
      users: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  updateValue (e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  componentDidMount () {
    this.socket = new WebSocket('ws://localhost:8080')
    this.socket.onopen = () => this.onSocketOpen()
    this.socket.onmessage = (ev) => this.onSocketData(ev)
    this.socket.onclose = (ev) => this.onSocketClose()
  }

  onSocketOpen () {
    const name = prompt('What is your name ?')

    if (name !== '') {
      this.socket.send(JSON.stringify({
        type: 'connection',
        joined: name
      }))
    }		else {
      let randomId = Math.floor(Math.random() * 1000)

      this.socket.send(JSON.stringify({
        type: 'connection',
        joined: `Guest ${randomId}`
      }))
    }
  }

  onSocketData (ev) {
    let data = JSON.parse(ev.data)
    let newMessages = this.state.messages

    if (data.type === 'connection') {
      newMessages.push(data)
      this.setState({
        users: data.connections,
        messages: newMessages
      })
    }	else if (data.type === 'message') {
      newMessages.push(data)
      this.setState({
        messages: newMessages
      })
    }	else if (data.type === 'close') {
      newMessages.push(data)
      this.setState({
        users: data.connections,
        messages: newMessages
      })
    }
  }

  sendMessage (e) {
    if (this.state.inputValue !== '' && e.keyCode === 13) {
      this.socket.send(JSON.stringify({
        type: 'message',
        msg: this.state.inputValue
      }))
      this.setState({
        inputValue: ''
      })
    }
  }

  render () {
    return (
      <div className='wrapper'>
        <div className='wrapper-chat'>
          <div className='top'>
            <p className='text-chat'>Live Chat</p>
            <p className='text-online'>Online {this.state.users.length}</p>
          </div>
          <Messages list={this.state.messages}
            time={this.state.time}
            log={this.state.log}
				 />
          <Send updateValue={this.updateValue}
            inputValue={this.state.inputValue}
            sendMessage={this.sendMessage}
				/>
        </div>
        <Users users={this.state.users} />
      </div>
    )
  }
}

ReactDOM.render(<ChatApp />, app)
