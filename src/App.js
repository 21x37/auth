import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common'
import LoginForm from './components/LoginForm';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
        }
    }
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAAulZS8SOPH5spEp8lUU-foI-3ntepMHc",
            authDomain: "authentication-8dac5.firebaseapp.com",
            databaseURL: "https://authentication-8dac5.firebaseio.com",
            projectId: "authentication-8dac5",
            storageBucket: "authentication-8dac5.appspot.com",
            messagingSenderId: "273167708533",
            appId: "1:273167708533:web:a9aeb159013e7b4d"
          })

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
          });
    }
    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}>
                        Log Out
                    </Button>
                </CardSection>
                );
            case false:
                return <LoginForm/>;
            default:
                return <CardSection><Spinner/></CardSection>;
        }

    }
    render() {
        return (
            <View>
                <Header headerText='Auth' />
                {this.renderContent()}
            </View>
        );
    };
};

export default App;