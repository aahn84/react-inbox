import React from 'react'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      viewCompose: false,
      fetchingMessages: true,
    }
  }

  async componentDidMount() {
    this.getMessages();
  }

  async getMessages() {
    const getMessages = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const messagesJson = await getMessages.json();

    this.setState({
      messages: messagesJson._embedded.messages,
      fetchingMessages: false,
    });
  }

  starMessage = async (event, i) => {
    let messageIds = [this.state.messages[i].id];

    const requestBody = {
      messageIds,
      command: 'star',
      star: !this.state.messages[i].starred,
    };

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
    }
    catch(err) {
      console.log(err)
    }

    this.getMessages();
    }

  readMessage = async (event, i) => {
    let messageIds = [this.state.messages[i].id];

    const requestBody = {
      messageIds,
      command: 'read',
      read: !this.state.messages[i].read,
    };

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.getMessages();
  }

  selectMessage = (event, i) => {
    let newState = [...this.state.messages];
    newState[i].selected = !newState[i].selected;
    this.setState({
      messages: newState
    })
  }

  selectAllMessages = (event) => {
    let newState = [...this.state.messages];

    const filterSelected = newState.filter(item =>  item.selected);

    if (filterSelected.length === newState.length) {
      newState.forEach(message => {
        message.selected = false;
      })
    } else {
      newState.forEach(message => {
        message.selected = true;
      })
    }

    this.setState({
      messages: newState
    })
  }

  markAsRead = async (event, i) => {
    let messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id ] : ids;
    }, []);
    // console.log(messageIds);

    const requestBody = {
      messageIds,
      command: 'read',
      read: true,
    };

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.getMessages();
  }

  markAsUnread = async (event, i) => {
    let messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id ] : ids;
    }, []);

    const requestBody = {
      messageIds,
      command: 'read',
      read: false,
    };

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.getMessages();
  }

  deleteMessage = async (event, i) => {
    let messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id ] : ids;
    }, []);

    const requestBody = {
      messageIds,
      command: 'delete',
    };

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.getMessages();
  }

  applyLabel = async (event) => {
    let label;
    if (event.target.value !== 'Apply label') label = event.target.value;

    let messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id ] : ids;
    }, []);

    const requestBody = {
      messageIds,
      label,
      command: 'addLabel',
    };

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.getMessages();
  }

  removeLabel = async (event) => {
    let label;
    if (event.target.value !== 'Remove label') label = event.target.value;

    let messageIds = this.state.messages.reduce((ids, message) => {
      return message.selected ? [ ...ids, message.id ] : ids;
    }, []);

    const requestBody = {
      messageIds,
      label,
      command: 'removeLabel',
    };

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.getMessages();
  }

  toggleComposeMessage = (event) => {
    console.log(this.state.viewCompose);
    console.log('CLICKED IT!');
    let newComposeState = this.state.viewCompose;
    console.log('newComposeState', newComposeState);
    newComposeState = !newComposeState;

    this.setState({
      ...this.state,
      viewCompose: newComposeState,
    })
  }

  getSubject = (event) => {
    event.preventDefault();
    return event.target.value;
    // let newSubject = event.target.value;
    // console.log('subject', newSubject);
    // return newSubject;
  }

  getMessageBody = (event) => {
    event.preventDefault();
    return event.target.value;
    // let newMessageBody = event.target.value;
    // console.log('body', newMessageBody);
    // return newMessageBody;
  }

  sendMessage = async (event, getSubject, getMessageBody) => {
    event.preventDefault();
    console.log('clicked SEND');
    // let newSubject = getSubject();
    // console.log('new subject', newSubject);
    // let newMessageBody = getMessageBody();
    // console.log('new body', newMessageBody);

    const requestBody = {
      // subject:
      // body:
      read: false,
      starred: false,
      labels: [],
    }

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.getMessages();
  }

  render() {
    // console.log('this.state', this.state.messages);
    return (
      <div className="Container">
        <Toolbar
          messages={ this.state.messages }
          selectAllMessages={ this.selectAllMessages }
          markAsRead={ this.markAsRead }
          markAsUnread={ this.markAsUnread }
          deleteMessage={ this.deleteMessage }
          applyLabel={ this.applyLabel }
          removeLabel={ this.removeLabel }
          toggleComposeMessage={ this.toggleComposeMessage }
        />
        <ComposeForm
          viewCompose={this.state.viewCompose}
          // toggleComposeMessage={this.toggleComposeMessage}
          getSubject={this.getSubject}
          getMessageBody={this.getMessageBody}
          sendMessage={ this.sendMessage }
        />
        <MessageList
          messages={ this.state.messages }
          starMessage={ this.starMessage }
          readMessage={ this.readMessage }
          selectMessage={ this.selectMessage }
        />
      </div>
    );
  }
}

export default App;
