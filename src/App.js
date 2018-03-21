import React from 'react'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      fetchingMessages: true,
      viewComposeForm: false,
      composeFormContent: {
        subject: '',
        body: '',
      },
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
    let newComposeState = this.state.viewComposeForm;
    newComposeState = !newComposeState;

    this.setState({
      ...this.state,
      viewComposeForm: newComposeState,
      composeFormContent: {
        subject: '',
        body: '',
      },
    })
  }

  setSubject = (event) => {
    let newSubject = event.target.value;
    // console.log('new subj', newSubject);

    this.setState({
      composeFormContent: {
        ...this.state.composeFormContent,
        subject: newSubject,
      }
    });
  }

  setMessageBody = (event) => {
    let newMessageBody = event.target.value;
    // console.log('new bod', newMessageBody);

    this.setState({
      composeFormContent: {
        ...this.state.composeFormContent,
        body: newMessageBody,
      }
    });
  }

  sendMessage = async (event) => {
    event.preventDefault();

    let newMessage = this.state.composeFormContent;
    if (!newMessage.subject || !newMessage.body) return;
    // console.log('clicked SEND');
    // console.log('1', this.state.composeFormContent);

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    this.setState({
      viewComposeForm: false,
      composeFormContent: {
        subject: '',
        body: '',
      }
    })

    this.getMessages();
  }

  render() {
    // console.log('this.state', this.state.messages);
    // console.log('2', this.state.composeFormContent);
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
          viewComposeForm={ this.state.viewComposeForm }
          toggleComposeMessage={ this.toggleComposeMessage }
          setSubject={ this.setSubject }
          setMessageBody={ this.setMessageBody }
          composeFormContent={ this.composeFormContent }
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
