import React from 'react'

const Message = ({
  message,
  value,
  readMessage,
  starMessage }) => {
  // let starIcon = "fa-star-o";
  // if (message.starred) starIcon = "fa-star"
  // console.log(message.starred);

  return (
    <div className={message.read ? "row message unread":"row message read"}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={message.starred ? "star fa fa-star-o":"star fa fa-star"} onClick={starMessage}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message
