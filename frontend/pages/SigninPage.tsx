import React, { useContext, useEffect } from 'react';import {
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native';
import { Button, CheckBox } from '@rneui/base';
import Ionicons from '@expo/vector-icons/Ionicons';

import globalStyles from '../GlobalStyles';
import NotificationBox from '../components/NotificationBox';
import { AuthContext } from '../AuthContext';


const { width, height } = Dimensions.get('window');

const SigninPage = ({ navigation }: { navigation: any }) => {
    const { requestSignin } = useContext(AuthContext);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [keepLoggedIn, setKeepLoggedIn] = React.useState(false);

    const [displayNotif, setDisplayNotif] = React.useState(false);
    const [notifSuccess, setNotifSuccess] = React.useState(false);
    const [notifText, setNotifText] = React.useState('');

    const initiateSignin = async () => {
        requestSignin({
            email_address: email,
            password: password,
        }, keepLoggedIn)
        .then(() => {
            setNotifText('Successfully logged in. Redirecting to home...')
            setNotifSuccess(true);
            setDisplayNotif(true);
        })
        .catch(() => {
            setNotifText('There was an error signing in. Please check your credentials and try again.')
            setNotifSuccess(false);
            setDisplayNotif(true);
        })
    }
    
    const handleCloseNotif = () => {
        setDisplayNotif(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 0.015 * height }}>
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
            <CheckBox
                checked={keepLoggedIn}
                uncheckedIcon={<Ionicons name="md-checkmark-circle-outline" size={26} color="black" />}
                checkedIcon={<Ionicons name="md-checkmark-circle" size={26} color="green" />}
                title='Keep me logged in'
                containerStyle={globalStyles.basicInputField}
                onPress={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            <Button title="Sign In" onPress={initiateSignin}/>
            <Text>
                Don't have an account? <Text onPress={() => navigation.navigate('Sign-up')} style={globalStyles.inlineLink}>Sign up</Text> instead
            </Text>

            {!!displayNotif ? (
            <NotificationBox
                isVisible={displayNotif}
                isSuccess={notifSuccess}
                content={notifText}
                onClose={handleCloseNotif}
            />): (<></>)}
        </View>
    );
}

export default SigninPage;