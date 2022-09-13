import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// const firebase = require('firebase');
// require('firebase/firestore');

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

export default class Chat extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: ''
      }
    };

    //Setting up and connecting Firebase//
    const firebaseConfig = {
      apiKey: "AIzaSyAuXvryfG3nGzIYar-9FivpXOutVXt8KKk",
      authDomain: "test-2fbfb.firebaseapp.com",
      projectId: "test-2fbfb",
      storageBucket: "test-2fbfb.appspot.com",
      messagingSenderId: "12796364052",
      appId: "1:12796364052:web:b16729f8247a508426ee01",
      measurementId: "G-C6BVFMNGM0",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //reference to collection. stores and retrieves the chat messages your users send//
    this.referenceChatMessages = firebase.firestore().collection('messages');

  }
  //GOOD//
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });
    this.setState({
      messages,
    });
  };

  componentDidMount() {
    //Set name as title chat
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    //Authenticate user anonymously//
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  //GOOD//
  addMessages(message) {
    this.referenceChatMessages.add({
      _id: message._id,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt.toDate(),
      user: message.user
    });
  };

  //GOOD//
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  //GOOD//
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    const { color } = this.props.route.params;

    return (
      <View style={{ backgroundColor: color, flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.text}>Chat Screen</Text>
        </View>
        <View style={{ flex: 1 }}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{ _id: this.state.user._id, name: this.state.user.name }}
          />
          {Platform.OS === 'android' ? (<KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#FFFFFF'
  }
})