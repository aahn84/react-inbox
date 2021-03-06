import React from 'react'

const Toolbar = ({
  messages,
  selectAllMessages,
  markAsRead,
  markAsUnread,
  deleteMessage,
  applyLabel,
  removeLabel,
  toggleComposeMessage,
}) => {

  let unread = messages.filter(message => !message.read);
  let selected = messages.filter(message => message.selected);

  let selectBoxIcon;
  if (selected.length === 0) selectBoxIcon = "fa fa-square-o";
  else if (selected.length && selected.length < messages.length) selectBoxIcon = "fa fa-minus-square-o";
  else selectBoxIcon = "fa fa-check-square-o";

  let disabledStatus;
  if (selected) disabledStatus = "";
  else disabledStatus = "disabled"

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unread.length}</span>
          unread messages
        </p>

        <a onClick={toggleComposeMessage} className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button onClick={selectAllMessages} className="btn btn-default">
          <i className={selectBoxIcon}></i>
        </button>

        <button
          className="btn btn-default"
          disabled={disabledStatus}
          onClick={markAsRead}
        >
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled={disabledStatus}
          onClick={markAsUnread}
        >
          Mark As Unread
        </button>

        <select className="form-control label-select"
          disabled={disabledStatus}
          onChange={applyLabel}
      >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select"
          disabled={disabledStatus}
          onChange={removeLabel}
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          disabled={disabledStatus}
          onClick={deleteMessage}
        >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
