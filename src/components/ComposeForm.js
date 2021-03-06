import React from 'react'

// class ComposeForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       subject: '',
//       body: '',
//     }
//   }

const ComposeForm = ({
  viewComposeForm,
  toggleComposeMessage,
  setSubject,
  setMessageBody,
  composeFormContent,
  sendMessage,
}) => {

  // setSubject = (event) => {
  //   let newSubject = event.target.value;
  //
  //   this.setState({
  //     subject: newSubject
  //   });
  // }
  //
  // setMessageBody = (event) => {
  //   let newMessageBody = event.target.value;
  //
  //   this.setState({
  //     body: newMessageBody
  //   });
  // }
  //
  // handleSendButton = (event) => {
  //   event.preventDefault();
  //   let newMessage = { ...this.state };
  //
  //   if (newMessage.subject && newMessage.body) {
  //     this.props.sendMessage(newMessage);
  //   }
  // }

  // render(){
    let toggleCompose = viewComposeForm ? 'block' : 'none';

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
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Enter a subject"
                name="subject"
                onChange={ (e) => {setSubject(e)} }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea
                name="body"
                id="body"
                className="form-control"
                onChange={ (e) => {setMessageBody(e)} }
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input
                type="submit"
                value="Send"
                className="btn btn-primary"
                onClick={ sendMessage }
              />
            </div>
          </div>
        </form>
      </div>
    );
  // }
}

export default ComposeForm;
