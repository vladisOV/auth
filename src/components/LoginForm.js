import React, { Component } from "react";
import { Text } from "react-native";
import { CardSection, Card, Button, Input, Spinner } from "./common";
import firebase from "firebase";

class LoginForm extends Component {
  state = { email: "", password: "", error: "", loading: false };

  onButtonPress = () => {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail);
      });
  };

  onLoginFail = () => {
    this.setState({ error: "Authentication failed", loading: false });
  };

  onLoginSuccess = () => {
    this.setState({ email: "", password: "", error: "", loading: false });
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 18,
    alignSelf: "center",
    color: "red"
  }
};

export default LoginForm;
