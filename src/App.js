import React from 'react';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
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
      })
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
    })

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
    })

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
    }

    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    this.getMessages();
  }


  /*
  */
  deleteMessage = (event) => {
    let newState = [...this.state.messages];
    newState = newState.filter(message => !message.selected);
    this.setState({
      messages: newState
    })
  }

  applyLabel = (event) => {
    let labelTag;
    if (event.target.value !== 'Apply label') labelTag = event.target.value;

    let newState = [...this.state.messages];
    newState = newState.map(message => {
      if (message.selected && !message.labels.includes(labelTag)) {
        message.labels.push(labelTag);
      }
      return message;
    })
    this.setState({
      messages: newState
    })
  }

  removeLabel = (event) => {
    let labelTag;
    if (event.target.value !== 'Remove label') labelTag = event.target.value;

    let newState = [...this.state.messages];
    newState = newState.map(message => {
      if (message.selected) {
        message.labels = message.labels.filter(label => label !== labelTag);
      }
      return message;
    })
    this.setState({
      messages: newState
    })
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
