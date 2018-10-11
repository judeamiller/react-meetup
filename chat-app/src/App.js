import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import styled from 'styled-components';
import firebase from './firebase';


const MainContainer = styled.div`
  width: 100%;
  background-color: black;
  color: white;
  padding: 50px;
`;

class App extends Component {
  constructor(props) {
      super(props);
      this.state= {
        messages:[
          'hello world',
          'message number two',
          'message three'
        ],
      }
  }

  componentDidMount = () =>  {
    const messagesRef = firebase.database().ref('messages');

    messagesRef.on('value', (snapshot) => {
      let messages = [];
      snapshot.forEach(element=> {
        messages.push(`${element.val().username}: ${element.val().message}`);
      })
      this.setState({
        messages,
      })
    });
  }
  
  addNewMessage = message => {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.push({
      username: 'Jude',
      message,
    }, function(error){
      if (error) {
        console.log(error)
      } else {
        console.log('success');
      }
    })
  }

  render() {
    return (
      <MainContainer className="App">
       <ChatWindow messages={this.state.messages} />
       <ChatInput addNewMessage={this.addNewMessage}/>
      </MainContainer>
    );
  }
}

export default App;
