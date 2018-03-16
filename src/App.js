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
    })
  }

  readMessage = (event, i) => {
    let newState = [...this.state.messages];
    newState[i].read = !newState[i].read;
    this.setState({
      messages: newState
    })
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

  starMessage = (event, i) => {
    let newState = [...this.state.messages];
    newState[i].starred = !newState[i].starred;
    this.setState({
      messages: newState
    })
  }

  markAsRead = (event) => {
    let newState = [...this.state.messages];
    newState = newState.map(message => {
      if (message.selected) message.read = true;
      return message;
    });
    this.setState({
      messages: newState
    })
  }

  markAsUnread = (event) => {
    let newState = [...this.state.messages];
    newState = newState.map(message => {
      if (message.selected) message.read = false;
      return message;
    })
    this.setState({
      messages: newState
    })
  }

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
    console.log(this.state.messages);
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
          readMessage={ this.readMessage }
          selectMessage={ this.selectMessage }
          starMessage={ this.starMessage }
        />
      </div>
    );
  }
}

export default App;
