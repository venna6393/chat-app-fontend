import React from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import Header from '../Header/Header'

const socket = io(
  'https://vishnus-chat-app-backend.eu-north-1.elasticbeanstalk.com',
)

class ChatApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message: '',
    }
  }

  componentDidMount() {
    this.fetchChatData()
    socket.on('message', () => {
      this.fetchChatData()
    })
  }

  fetchChatData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const user1 = Cookies.get('user1')
    console.log(user1)
    try {
      const data = await fetch(
        'https://vishnus-chat-app-backend.eu-north-1.elasticbeanstalk.com/messages',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      const results = await data.json()
      console.log(results.messages)
      this.setState({messages: results.messages})
    } catch (error) {
      console.error('Failed to fetch transactions:', error.message)
    }
  }

  sendMessage1 = async () => {
    // Send message to server via WebSocket
    const user1 = Cookies.get('user1')
    const userId1 = Cookies.get('userId1')
    const {message} = this.state
    await socket.emit('send-message', {
      userId1,
      user1,
      message,
    })
    console.log(userId1)

    // Update local state to display the message immediately
    this.fetchChatData()
    this.setState({message: ''})
  }

  handleChange = event => {
    this.setState({message: event.target.value})
  }

  render() {
    const {messages, message} = this.state
    return (
      <div className="chat-app">
        <Header />
        {messages.map(message1 => (
          <p key={message1.id}>{message1.message}</p>
        ))}
        <div>
          <input
            type="text"
            placeholder="Enter Message"
            onChange={this.handleChange}
            id="message"
            value={message}
          />
          <button type="button" onClick={this.sendMessage1}>
            send Message
          </button>
        </div>
      </div>
    )
  }
}

export default ChatApp
