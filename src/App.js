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
      newState.forEach(item => {
        item.selected = false;
      })
    } else {
      newState.forEach(item => {
        item.selected = true;
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
    newState = newState.filter(item => !item.selected);
    this.setState({
      messages: newState
    })
  }

  // addLabel = (event, i) => {
  //   let newState = [...this.state.messages];
  // }

  render() {
    console.log(this.state);
    return (
      <div className="Container">
        <Toolbar
          messages={ this.state.messages }
          selectAllMessages={ this.selectAllMessages }
          deleteMessage={ this.deleteMessage }
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
