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
    // console.log('subject', newSubject);

    this.setState({
      subject: newSubject
    });
  }

  getMessageBody = (event) => {
    let newMessageBody = event.target.value;
    // console.log('body', newMessageBody);

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

  // sendMessage = async (event) => {
  //   event.preventDefault();
  //   console.log('clicked SEND');
  //   console.log('1', getSubject);
  //   console.log('2', getMessageBody);
  //   // let newSubject = getSubject();
  //   // console.log('new subject', newSubject);
  //   // let newMessageBody = getMessageBody();
  //   // console.log('new body', getMessageBody);
  //
  //   const requestBody = {
  //     // subject:
  //     // body:
  //     read: false,
  //     starred: false,
  //     labels: [],
  //   }
  //
  //   await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
  //     method: 'POST',
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     }
  //   });
  //
  //   this.getMessages();
  // }

  render(){
    console.log(this.state);
    // console.log(this.state.viewCompose);
    const { viewCompose, newSubject, newMessageBody, sendMessage } = this.props;
    // console.log('ha', viewCompose);
    // let toggleCompose = this.state.viewCompose ? 'block' : 'none';
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
