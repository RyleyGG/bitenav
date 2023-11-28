import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const globalStyles = StyleSheet.create({
    basicInputField: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    inlineLink: {
        color: 'blue',
    },
    basicDialog: {
        backgroundColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 15,
        width: height > width ? 0.95 * width : 0.35 * width,
        height: height > width ? 0.95 * height : 0.55 * height
    }
});

export default globalStyles;