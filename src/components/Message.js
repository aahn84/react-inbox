import React from 'react'

const Message = ({
  message,
  readMessage,
  selectMessage,
  starMessage
}) => {

  let read = message.read ? "read":"unread";
  let selected = message.selected ? "selected":"";

  return (
    <div className={`row message ${read} ${selected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={!!message.selected} onChange={selectMessage}/>
          </div>
          <div className="col-xs-2">
            <i className={message.starred ? "star fa fa-star":"star fa fa-star-o"} onClick={starMessage}></i>
          </div>
        </div>
      </div>
      <div onClick={readMessage} className="col-xs-11">
        {message.labels.map((label, i) => {
          return <span key={i} className="label label-warning">{label}</span>
        })}
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message
