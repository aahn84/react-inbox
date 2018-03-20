import React from 'react'

class ComposeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      body: '',
    }
  }

  getSubject = (event) => {
    let newSubject = event.target.value;

    this.setState({
      subject: newSubject
    });
  }

  getMessageBody = (event) => {
    let newMessageBody = event.target.value;

    this.setState({
      body: newMessageBody
    });
  }

  handleSendButton = (event) => {
    event.preventDefault();
    let newMessage = { ...this.state };

    if (newMessage.subject && newMessage.body) {
      this.props.sendMessage(newMessage);
    }
  }

  render(){
    let toggleCompose = this.props.viewCompose ? 'block' : 'none';

    return (
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
              <input onChange={ this.getSubject } type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea onChange={ this.getMessageBody } name="body" id="body" className="form-control"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input onClick={ this.handleSendButton } type="submit" value="Send" className="btn btn-primary"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ComposeForm;
