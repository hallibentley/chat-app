import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, orderBy, onSnapshot, query, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

//Setting up and connecting Firebase (chat-app-2)//
const firebaseConfig = {
  apiKey: "AIzaSyB0WFSvDLrP6e0kjNFBvo3Tn1JAHnhnEJk",
  authDomain: "chat-app-2-fc76d.firebaseapp.com",
  projectId: "chat-app-2-fc76d",
  storageBucket: "chat-app-2-fc76d.appspot.com",
  messagingSenderId: "785034198767",
  appId: "1:785034198767:web:71a34f5d3039ed1990e51a"
};

//Initialize firebase
const app = initializeApp(firebaseConfig);
//Initialize firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export default function Chat(props) {
  let { name } = props.route.params;
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState();
  const [isConnected, setIsConnected] = useState();

  const messagesCollection = collection(db, "messages");

  useEffect(() => {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isConnected) {
      const authUnsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          signInAnonymously(auth);
        }
        setUid(user.uid);
      });

      const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

      let unsubscribe = onSnapshot(messagesQuery, onCollectionUpdate);

      return () => {
        unsubscribe();
        authUnsubscribe();
      }
    } else {
      console.log("not connected");
      getMessages();
    }
  }, [isConnected]);

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  const onCollectionUpdate = (querySnapshot) => {
    let messages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();

      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });

    setMessages(
      messages
    );
  };

  const addMessage = (message) => {
    addDoc(messagesCollection, {
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || "",
      user: message.user,
    })
  }

  const onSend = (messages = []) => {
    addMessage(messages[0]);
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    // saveMessages();
    console.log(AsyncStorage.getItem("messages"));
  };

  const saveMessages = async () => {
    try {
      const jsonMessages = JSON.stringify(messages);
      await AsyncStorage.setItem("messages", jsonMessages);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMessages = async () => {
    let messages = "";

    try {
      messages = await AsyncStorage.getItem("messages") || [];
      // console.log(JSON.parse(messages));
      setMessages(JSON.parse(messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
      setMessages([]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "lightblue"
        },
        left: {
          backgroundColor: "teal"
        }
      }}
      textStyle={{
        right: {
          color: "black",
        },
        left: {
          color: "white",
        },
      }}
    />
  );

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />
    }
  };





  return (

    <View style={{ flex: 1 }}>
      <GiftedChat
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: uid, name: name, }}
      />
      {Platform.OS === 'android' ? (<KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );

}





































//   export default class Chat extends Component {

//     constructor() {
//       super();
//       this.state = {
//         messages: [],
//         uid: 0,
//         user: {
//           _id: '',
//           name: ''
//         },
//       };

//       if (!firebase.apps.length) {
//         firebase.initializeApp(firebaseConfig);
//       }

//     }

//     onCollectionUpdate = (querySnapshot) => {
//       const messages = [];
//       // go through each document
//       querySnapshot.forEach((doc) => {
//         // get the QueryDocumentSnapshot's data
//         let data = doc.data();
//         messages.push({
//           _id: data._id,
//           text: data.text,
//           createdAt: data.createdAt.toDate(),
//           user: {
//             _id: data.user._id,
//             name: data.user.name,
//           },
//         });
//       });
//       this.setState({
//         messages,
//       });
//     };

//     const querySnapshot = await getDocs(collection(db, 'messages'));
//   querySnapshot.forEach((doc) => {

//   })



//   componentDidMount() {
//     //Set name as title chat
//     let { name } = this.props.route.params;
//     this.props.navigation.setOptions({ title: name });

//     //reference to collection. stores and retrieves the chat messages your users send//
//     this.referenceChatMessages = firebase.firestore().collection('messages');


//     // Authenticates user via Firebase
//     this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (!user) {
//         firebase.auth().signInAnonymously();
//       }
//       this.setState({
//         uid: user.uid,
//         messages: [],
//         user: {
//           _id: user.uid,
//           name: name,
//         },
//       });

//       this.referenceMessagesUser = firebase
//         .firestore()
//         .collection("messages")
//         .where("uid", '==', this.state.uid);
//     });
//   }

//   //Authenticate user anonymously//
//   //   this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
//   //     if (!user) {
//   //       firebase.auth().signInAnonymously();
//   //     }
//   //     this.setState({
//   //       uid: user.uid,
//   //       messages: [],
//   //       user: {
//   //         _id: user.uid,
//   //         name: name
//   //       }
//   //     });
//   //     this.unsubscribe = this.referenceChatMessages
//   //       .orderBy("createdAt", "desc")
//   //       .onSnapshot(this.onCollectionUpdate);
//   //   });
//   // }


//   componentWillUnmount() {
//     this.authUnsubscribe();
//   }

//   addMessages() {
//     const message = this.state.messages[0];
//     this.referenceChatMessages.add({
//       _id: message._id,
//       _id: message._id,
//       text: message.text,
//       createdAt: message.createdAt,
//       user: message.user
//     });
//   };

//   onSend(messages = []) {
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }), () => {
//       this.addMessages();
//     });
//   }

//   renderBubble(props) {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#000'
//           }
//         }}
//       />
//     )
//   };

//   render() {
//     let { color, name } = this.props.route.params;

//     return (

//       <View style={[{ backgroundColor: color }, styles.container]}>
//         <GiftedChat
//           renderBubble={this.renderBubble.bind(this)}
//           messages={this.state.messages}
//           onSend={(messages) => this.onSend(messages)}
//           user={{ _id: this.state.user._id, name: name }}
//         />
//         {Platform.OS === 'android' ? (<KeyboardAvoidingView behavior="height" />
//         ) : null}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// )}