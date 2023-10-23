import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Button } from '@rneui/base';

import globalStyles from '../GlobalStyles'; // adjust the path as necessary

const SignupPage = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '1.5vh' }}>
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
                onChangeText={setPassword}
                placeholder="Confirm Password"
                secureTextEntry={true}
                style={globalStyles.basicInputField}
            />
            <Button title="Sign Up" />

            <p>Already have an account? <a onClick={() => navigation.navigate('Sign-in')} style={globalStyles.inlineLink}>sign in</a> instead</p>
        </View>
    );
}

export default SignupPage;