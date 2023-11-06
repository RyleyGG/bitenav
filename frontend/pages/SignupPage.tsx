import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native';
import { Button } from '@rneui/base';

import { SignUpInfo } from '../models/Auth';
import globalStyles from '../GlobalStyles';
import NotificationBox from '../components/NotificationBox';
import { AuthContext } from '../AuthContext';


const { width, height } = Dimensions.get('window');

const SignupPage = ({ navigation }: { navigation: any }) => {
    const { requestSignup } = useContext(AuthContext);

    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [dataIsValid, setDataIsValid] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [displayNotif, setDisplayNotif] = React.useState(false);
    const [notifSuccess, setNotifSuccess] = React.useState(false);
    const [notifText, setNotifText] = React.useState('');

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

    const initiateSignup = async () => {
        requestSignup({
            'first_name': firstName,
            'last_name': lastName,
            'email_address': email,
            'password': password
        })
        .then((data: any) => {
            setNotifText('Account successfully created. Redirecting to sign-in page in 3 seconds...')
            setNotifSuccess(true);
            setDisplayNotif(true);

            setTimeout((
            ) => {
                navigation.navigate('Sign-in');
            }
            , 3000)
        })
        .catch((error: any) => {
            setNotifText('There was an error creating your account. Please try again.')
            setNotifSuccess(false);
            setDisplayNotif(true);
        });
    }

    const handleCloseNotif = () => {
        setDisplayNotif(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 0.015 * height }}>
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

            <Text>
                Already have an account? <Text onPress={() => navigation.navigate('Sign-in')} style={globalStyles.inlineLink}>Sign in</Text> instead
            </Text>

            {displayNotif ? (
            <NotificationBox
                isVisible={displayNotif}
                isSuccess={notifSuccess}
                content={notifText}
                onClose={handleCloseNotif}
            />): (<></>)}
        </View>
    );
}

export default SignupPage;