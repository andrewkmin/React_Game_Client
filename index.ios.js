/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from 'react-native';

var REACT = React.createClass ({
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Splash,
          title: 'REACT!',
          backButtonTitle: 'Main Menu',
          navigationBarHidden: true
        }}
        style={{flex: 1}}
      />
    );
  }
})

var Splash = React.createClass({
  navLogin() {
    this.props.navigator.push({
      component: Login,
      title: 'Login',
      tintColor: '#fff',
      titleTextColor: '#fff',
      barTintColor: '#3498db'
    })
  },
  navRegister() {
    this.props.navigator.push({
      component: Register,
      title: 'Register',
      tintColor: '#fff',
      titleTextColor: '#fff',
      barTintColor: '#3498db',
      rightButtonTitle: 'GAME',
      onRightButtonPress: () => this.props.navigator.push({
        component: Main,
        title: 'REACT!',
        tintColor: 'transparent',
        titleTextColor: '#fff',
        barTintColor: '#3498db'
      })
    })
  },
  render() {
    return (
      <View style={{flex: 1, borderTopWidth: 25, borderBottomWidth: 25, borderLeftWidth: 20, borderRightWidth: 20, borderColor: '#3498db'}}>
        <StatusBar
          hidden={false}
          barStyle='light-content'
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 40, textAlign: 'center', color: '#2980b9'}}>
            Welcome to
          </Text>
          <Text style={{fontSize: 60, fontWeight: 'bold', textAlign: 'center', marginBottom: 130, color: '#3498db'}}>
            REACT!
          </Text>
          <View style={{alignSelf: 'center', paddingRight: 57, paddingLeft: 57}}>
            <TouchableOpacity style={[{alignSelf: 'stretch', padding: 5, margin: 5, borderRadius: 5, borderWidth: 2.5, borderColor: '#2980b9', height: 60, width: 250, justifyContent: 'center'}, styles.buttonBlue]} onPress={this.navLogin}>
              <Text style={[styles.buttonLabel, {fontSize: 25}]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{alignSelf: 'stretch', padding: 5, margin: 5, borderRadius: 5, borderWidth: 2.5, borderColor: '#2980b9', height: 60, width: 250, justifyContent: 'center'}, styles.buttonBlue]} onPress={this.navRegister}>
              <Text style={[styles.buttonLabel, {fontSize: 25}]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
})

var Login = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    }
  },
  login() {
    if(this.state.username && this.state.password) {
      fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success) {
          AsyncStorage.setItem('user', JSON.stringify ({
            username: this.state.username,
            password: this.state.password
          }))
          this.props.navigator.resetTo({
            component: Main,
            title: 'BOP IT!',
            tintColor: '#fff',
            titleTextColor: '#fff',
            barTintColor: '#3498db'
          })
        } else {
          this.setState({
            error: responseJson.error
          })
        }
      })
    } else {
      this.setState({
        error: "Missing username or password!"
      })
    }
  },
  navRegister() {
    this.props.navigator.push({
      component: Register,
      title: 'Register'
    })
  },
  render() {
    return (
      <View style={{flex: 1, borderBottomWidth: 25, borderColor: '#3498db'}}>
        <StatusBar
          hidden={false}
          barStyle='light-content'
        />
        <View style={{flex: 1.1}} />
        <View style={{flex: 10, justifyContent: 'center'}}>
          {this.state.error && <Text style={{alignSelf: 'center', fontSize: 20, marginBottom: 20}}>
            {this.state.error}
          </Text>}
          <TextInput //USERNAME
          style={{height: 40, width: 250, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, alignSelf: 'center', borderWidth: 1.5, borderRadius: 5, borderColor: '#2980b9', margin: 5}}
          placeholder="Username"
          onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput //PASSWORD
          style={{height: 40, width: 250, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, alignSelf: 'center', borderWidth: 1.5, borderRadius: 5, borderColor: '#2980b9', margin: 5}}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center', paddingRight: 57, paddingLeft: 57}}>
            <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={this.login}>
              <Text style={styles.buttonLabel}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
})

var Register = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
      confirmPass: ''
    }
  },
  register() {
    console.log(this.state);
    if(this.state.username && this.state.password) {
      if(this.state.password === this.state.confirmPass) {
        fetch('https://react-the-game.herokuapp.com/register', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            confirmPass: this.state.confirmPass
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.success) {
            AsyncStorage.setItem('user', JSON.stringify({
              username: this.state.username,
              password: this.state.password
            }))
            this.props.navigator.resetTo({
              component: Main,
              title: 'BOP IT!',
              tintColor: '#fff',
              titleTextColor: '#fff',
              barTintColor: '#3498db'
            })
          } else {
            this.setState({
              error: responseJson.error
            })
          }
        })
      } else {
        this.setState({
          error: "Passwords don't match!"
        })
      }
    } else {
      this.setState({
        error: "Missing username or password!"
      })
    }
  },
  render() {
    return (
      <View style={{flex: 1, borderBottomWidth: 25, borderColor: '#3498db'}}>
        <StatusBar
          hidden={false}
          barStyle='light-content'
        />
        <View style={{flex: 1.1}} />
        <View style={{flex: 10, justifyContent: 'center'}}>
          {this.state.error && <Text style={{alignSelf: 'center', fontSize: 20, marginBottom: 20}}>
            {this.state.error}
          </Text>}
          <TextInput //USERNAME
          style={{height: 40, width: 250, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, alignSelf: 'center', borderWidth: 1.5, borderRadius: 5, borderColor: '#2980b9', margin: 5}}
          placeholder="Username"
          onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput //PASSWORD
          style={{height: 40, width: 250, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, alignSelf: 'center', borderWidth: 1.5, borderRadius: 5, borderColor: '#2980b9', margin: 5}}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput //CONFIRM PASSWORD
          style={{height: 40, width: 250, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, alignSelf: 'center', borderWidth: 1.5, borderRadius: 5, borderColor: '#2980b9', margin: 5}}
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(text) => this.setState({confirmPass: text})}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center', paddingRight: 57, paddingLeft: 57}}>
            <TouchableOpacity style={[styles.button, styles.buttonBlue]} onPress={this.register}>
              <Text style={styles.buttonLabel}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
})

var Main = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
      leaders: []
    }
  },
  componentDidMount() {
    this.setState({
      leaders: [
        {username: 'moose', highScore: 1000},
        {username: 'darwish', highScore: 900},
        {username: 'abhi', highScore: 800},
        {username: 'seb', highScore: 700},
        {username: 'ricky', highScore: 600},
        {username: 'prath', highScore: 500},
        {username: 'andrew', highScore: 400},
        {username: 'syed', highScore: 300},
        {username: 'zinger', highScore: 200},
        {username: 'lando', highScore: 100}
      ]
    })
  },
  startGame() {
    this.props.navigator.push({
      component: Tap,
      title: 'Tap!',
      navigationBarHidden: true
    })
  },
  render() {
    return (
      <View style={{flex: 1, borderBottomWidth: 25, borderColor: '#3498db'}}>
        <StatusBar
          hidden={false}
          barStyle='light-content'
        />
        <View style={{flex: 1.1, marginBottom: 40}} />
        <View style={{flex: 10}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 3, justifyContent: 'center'}}>
              <Text style={{alignSelf: 'center', marginBottom: 15, fontSize: 40, color: '#3498db', fontWeight: 'bold'}}>Leaderboard</Text>
              {this.state.leaders.map((leaderObject, i) =>
                <Text key={i} style={{fontSize: 22, paddingBottom: 8, paddingLeft: 10, paddingRight: 10}}>
                  <Text style={{color: '#2980b9', fontWeight: 'bold'}}>{i+1}. </Text>
                  <Text style={{color: '#3498db'}}>{leaderObject.username}: </Text>
                  <Text style={{fontStyle: 'italic', color: '#2980b9'}}>{leaderObject.highScore}</Text>
                </Text>
              )}
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', paddingRight: 57, paddingLeft: 57}}>
              <TouchableOpacity style={[styles.button, styles.buttonBlue, {height: 60, width: 250, alignSelf: 'center'}]} onPress={this.startGame}>
                <Text style={[styles.buttonLabel, {fontSize: 25}]}>
                  Let&#39;s Play!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
})

var Tap = React.createClass({
  getInitialState() {
    return {
      user: {
        username: 'zinger'
      },
      color: '',
      score: 0,
      high: 578
    }
  },
  colorPress(color) {
    this.setState({
      color: color,
      score: this.state.score + 5
    })
  },
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          hidden={true}
        />
        <View style={{flex: 0.2, justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{alignSelf: 'center', paddingLeft: 10, paddingRight: 10, fontSize: 20, flex: 1, textAlign: 'left'}}>
            { (this.state.user.username.length > 20) ? (this.state.user.username.substring(0, 18-3) + '...') : this.state.user.username }
          </Text>
          <Text style={{alignSelf: 'center', paddingLeft: 10, paddingRight: 10, fontSize: 20, flex: 1, textAlign: 'right'}}>
            High Score: {this.state.high}
          </Text>
        </View>
        <View style={{flex: 0.4, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 70, fontWeight: 'bold'}}>
            {this.state.score}
          </Text>
        </View>
        <View style={{flex: 0.4, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 60, fontWeight: 'bold', fontStyle: 'italic'}}>
            TAP IT!
          </Text>
        </View>
        <View style={{flex: 2}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1, borderRadius: 5, backgroundColor: '#e74c3c', marginTop: 8, marginLeft: 8, marginRight: 3, marginBottom: 3}}
            onPress={this.colorPress.bind(this, 'red')}>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, borderRadius: 5, backgroundColor: '#3498db', marginTop: 8, marginLeft: 3, marginRight: 8, marginBottom: 3}}
            onPress={this.colorPress.bind(this, 'blue')}>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1, borderRadius: 5, backgroundColor: '#f1c40f', marginTop: 3, marginLeft: 8, marginRight: 3, marginBottom: 8}}
            onPress={this.colorPress.bind(this, 'yellow')}>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, borderRadius: 5, backgroundColor: '#2ecc71', marginTop: 3, marginLeft: 3, marginRight: 8, marginBottom: 8}}
            onPress={this.colorPress.bind(this, 'green')}>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: '#2980b9',
    flex: 1,
    height: 50,
    justifyContent: 'center'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonBlue: {
    backgroundColor: '#3498db'
  }
});

AppRegistry.registerComponent('React_Game', () => REACT);
