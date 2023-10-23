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

const SigninPage = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '1.5vh' }}>
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                style={globalStyles.basicInputField}
            />
            <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                style={globalStyles.basicInputField}
            />
            <Button title="Sign In" />

            <p>Don't have an account? <a onClick={() => navigation.navigate('Sign-up')} style={globalStyles.inlineLink}>sign up</a> instead</p>
        </View>
    );
}

export default SigninPage;