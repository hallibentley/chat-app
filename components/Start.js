import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";


const image = require('../assets/background-image.png')

export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.backgroundImage}>
          <Text
            style={styles.title}>
            Chat App
          </Text>
          <View style={styles.box1}>
            <TextInput
              style={[styles.textInput, styles.smallText]}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Your name'
            />
            <View style={styles.colorWrapper}>
              <Text
                style={styles.smallText}>
                Choose background color:
              </Text>
              <View style={styles.colors}>
                <TouchableOpacity style={[styles.color, styles.color1]}
                  onPress={() => this.setState({ color: '#090C08' })} />
                <TouchableOpacity style={[styles.color, styles.color2]}
                  onPress={() => this.setState({ color: '#474056' })} />
                <TouchableOpacity style={[styles.color, styles.color3]}
                  onPress={() => this.setState({ color: '#8A95A5' })} />
                <TouchableOpacity style={[styles.color, styles.color4]}
                  onPress={() => this.setState({ color: '#B9C6AE' })} />
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button}
                onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}>
                <Text
                  style={styles.buttonText}>
                  Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: '20%'
  },
  box1: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '88%',
    height: '44%',
    alignItems: 'center',
    marginBottom: '6%',
    marginTop: '10%'
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 2,
    width: '88%',
    padding: '3%',
    marginTop: '15%',
    marginBottom: '15%',
  },
  smallText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  colorWrapper: {
    justifyContent: 'center',
    padding: '5%'
  },
  colors: {
    flexDirection: 'row',
    marginTop: '5%',
    marginBottom: '20%',
  },
  color: {
    width: 50,
    height: 50,
    marginHorizontal: '3%',
    borderRadius: 25
  },
  color1: {
    backgroundColor: '#090C08'
  },
  color2: {
    backgroundColor: '#474056'
  },
  color3: {
    backgroundColor: '#8A95A5'
  },
  color4: {
    backgroundColor: '#B9C6AE'
  },
  buttonWrapper: {
    flex: 1,
    width: '88%',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },


})