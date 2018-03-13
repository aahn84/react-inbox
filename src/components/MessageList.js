import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starMessage }) => {
  return (
    <div>
      { messages.map((message, i) => {
        return (
          <Message
            key={ i }
            value={ i }
            message={ message }
            starMessage={(e) => {starMessage(e, i)}}
          />
        )
      })}
    </div>
  )
}

export default MessageList
