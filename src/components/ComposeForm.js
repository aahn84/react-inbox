import React from 'react'

class ComposeForm extends React.Component {
  constructor({ viewCompose, toggleComposeMessage, sendMessage }) {
    super({ viewCompose, toggleComposeMessage, sendMessage });
    this.state = {
      viewCompose: this.props.viewCompose,
      newSubject: '',
      newMessageBody: '',
      // sendMessage: {},
    }
  }

  // toggleComposeMessage = (event) => {
  //   let newComposeState = this.state.viewCompose;
  //   newComposeState = !newComposeState;
  //
  //   this.setState({
  //     ...this.state,
  //     viewCompose: newComposeState,
  //   })
  // }

  getSubject = (event) => {
    // event.preventDefault();
    let newSubject = event.target.value;
    console.log('subject', newSubject);
    // return event.target.value;
    // return newSubject;
  }

  getMessageBody = (event) => {
    // event.preventDefault();
    // return event.target.value;
    let newMessageBody = event.target.value;
    console.log('body', newMessageBody);
    // return newMessageBody;
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
    // console.log(this.props);
    // console.log(this.state.viewCompose);
    const { viewCompose, newSubject, newMessageBody, sendMessage } = this.props;
    console.log('ha', viewCompose);
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
              <input onClick={ (e) => {sendMessage(e)} } type="submit" value="Send" className="btn btn-primary"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ComposeForm;
