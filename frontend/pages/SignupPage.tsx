import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Button } from '@rneui/base';

import { requestSignup } from '../services/AuthService';
import { SignUpInfo } from '../models/auth';

import globalStyles from '../GlobalStyles';


const SignupPage = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [dataIsValid, setDataIsValid] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState('');

    useEffect(() => {
        checkDataValidity();
    }, [email, firstName, lastName, password, confirmPassword]);

    const checkDataValidity = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setDataIsValid(false);
        }
        else if (firstName.length < 3 || lastName.length < 3) {
            setDataIsValid(false);
        }
        else if (password != confirmPassword) {
            setDataIsValid(false);
        }
        else if (!emailRegex.test(email)) {
            setDataIsValid(false);
        }
        else {
            setDataIsValid(true);
        }
    }

    const initiateSignup = () => {
        requestSignup({
            'first_name': firstName,
            'last_name': lastName,
            'email_address': email,
            'password': password
        })
        .then((data: any) => { 
        })
        .catch((error: any) => { console.log(error) });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '1.5vh' }}>
            <TextInput
                placeholder="First Name"
                onChangeText={setFirstName}
                style={globalStyles.basicInputField}
            />
            <TextInput
                placeholder="Last Name"
                onChangeText={setLastName}
                style={globalStyles.basicInputField}
            />
            <TextInput
                placeholder="Email Address"
                onChangeText={setEmail}
                style={globalStyles.basicInputField}
            />
            <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                style={globalStyles.basicInputField}
            />
            <TextInput
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={true}
                style={globalStyles.basicInputField}
            />
            <Button
                title="Sign Up"
                onPress={initiateSignup}
                disabled={!dataIsValid}
            />

            <p>Already have an account? <a onClick={() => navigation.navigate('Sign-in')} style={globalStyles.inlineLink}>Sign in</a> instead</p>
        </View>
    );
}

export default SignupPage;