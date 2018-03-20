import React from 'react'

const ComposeForm = ({
  viewCompose,
  getSubject,
  getMessageBody,
  sendMessage,
}) => {
  console.log(viewCompose);

  let toggleCompose = viewCompose ? 'block' : 'none';

  return (
    // <div>
    <div style={ {display: `${toggleCompose}`} }>
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input onChange={ (e) => {getSubject(e)} } type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea onChange={ (e) => {getMessageBody(e)} } name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input onClick={ (e) => {sendMessage(e)} } type="submit" value="Send" className="btn btn-primary"></input>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ComposeForm
