import React from 'react'
import Message from './Message'

const MessageList = ({
  messages,
  readMessage,
  selectMessage,
  starMessage
}) => {

  return (
    <div>
      { messages.map((message, i) => {
        return (
          <Message
            key={ i }
            value={ i }
            message={ message }
            readMessage={ (e) => {readMessage(e, i)} }
            selectMessage={ (e) => {selectMessage(e, i)} }
            starMessage={ (e) => {starMessage(e, i)} }
          />
        )
      })}
    </div>
  )
}

export default MessageList
