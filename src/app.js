import React, { Component } from "react";
import { View } from "react-native";
import { Header } from "./components/common";
import firebase from "firebase";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = { loggedIn: false };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDxxRMYzHFl7oZnlnPbCYs0weKHkj5gd74",
      authDomain: "auth-dd081.firebaseapp.com",
      databaseURL: "https://auth-dd081.firebaseio.com",
      projectId: "auth-dd081",
      storageBucket: "auth-dd081.appspot.com",
      messagingSenderId: "720287503470"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;
