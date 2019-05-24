import React from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFail = this.onLoginFail.bind(this);
    }
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true })

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess)
                    .catch(this.onLoginFail);
            });
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }
    onLoginFail() {
        this.setState({ error: 'Authentication Failed.', loading: false})
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small'/>;
        }
        return <Button onPress={this.onButtonPress}>Log In</Button>;
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                    placeholder='softkitty@warmkitty.com'
                    label='Email'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection >
                <Input 
                    secureTextEntry
                    placeholder='iLuvTaylorSw!ft123'
                    label='Password'
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>{this.state.error}</Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    };
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;