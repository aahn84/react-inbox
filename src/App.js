import React from 'react';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    }
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

  deleteMessage = (event, i) => {
    let newState = [...this.state.messages];
    newState = newState.filter(message => !message.selected);
    this.setState({
      messages: newState
    })
  }

  addLabel = (event, i) => {
    let label;
    if (event.target.value !== 'Apply label') label = event.target.value;
    
    let newState = [...this.state.messages];
    newState = newState.map(message => {
      if (message.selected && !message.labels.includes(label)) {
        message.labels.push(label);
      }
      return message;
    })
    this.setState({
      messages: newState
    })
  }
  // applyLabel = (e) => {
  //   let newState = [ ...this.state.messages ];
  //   newState = newState.map(message => {
  //     if (message.selected && !message.labels.includes(e.target.value)) {
  //       message.labels.push(e.target.value);
  //     }
  //     return message;
  //   });
  //   this.setState({
  //     messages: newState
  //   });
  // }

  render() {
    console.log(this.state);
    return (
      <div className="Container">
        <Toolbar
          messages={ this.state.messages }
          selectAllMessages={ this.selectAllMessages }
          deleteMessage={ this.deleteMessage }
          addLabel={ this.addLabel }
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
