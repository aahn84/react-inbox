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

  starMessage = (event, i) => {
    // console.log(event, i);
    let newState = [...this.state.messages];
    newState[i].starred = !newState[i].starred;
    this.setState({
      messages: newState
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="Container">
        <Toolbar />
        <MessageList
          messages={ this.state.messages }
          readMessage={ this.readMessage}
          starMessage={ this.starMessage }
        />
      </div>
    );
  }
}

export default App;
