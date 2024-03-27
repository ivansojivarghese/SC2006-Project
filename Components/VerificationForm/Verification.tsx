import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'; 

type RootStackParamList = {
    // Add other screens if needed
    'Cycle Savvy': undefined;	    //nagivate to main page upon verification
};
  
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
  
interface Props {
    navigation: ScreenNavigationProp;
}

const PhoneVerificationScreen = ({navigation}:Props) => { 
    const [code, setCode] = useState(''); 
    const [timer, setTimer] = useState(60); 
    
    useEffect(() => { 
        // Start the countdown 
        const interval = setInterval(() => { 
        setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0); 
        }, 1000); 
    
        // Clean up the interval on component unmount 
        return () => clearInterval(interval); 
    }, []); 
    
    const verifyCode = () => {  
        // Add your verification logic here check otp that has been sent upon correct login details
        //get user input and check against OTP generated
        // if verification failed -> handleResendCode(), prompt wrong input
        // else -> navigate to mainUI screen

        // handleVerified();

        // const [answer, setAnswer] = useState(''); 

        // writeUserAnswer(mobile, answer);

        navigation.reset({ index: 7, routes: [{ name: 'Cycle Savvy' }] })
    };

    const handleVerified = () => {
        console.log('Logging in...');
        navigation.replace('Cycle Savvy');
    }
    
    const handleResendCode = () => { 
        console.log('Resending code...'); 
        setTimer(60); // Reset the timer 
        // Add logic to resend the verification code if need, right now only resend option available after 1 min

    }; 

    const sendVerificationCode = () => {
        //send OTP to registered mobile number
        //return produced OTP
    }
    
    return ( 
        <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100} 
        > 
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
            <View style={styles.container}> 
            <View style={styles.container1}> 
				<Text style={styles.header}>Security Question</Text> 
			</View>
            <Text style={styles.instruction}>What is your favourite colour?</Text>  
            <Text style={styles.description}>Please answer the question above.</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Answer" 
                placeholderTextColor="#808080" 
                
                onChangeText={setCode} 
                value={code} 
                maxLength={6} 
            /> 
            <TouchableOpacity style={styles.button} onPress={verifyCode}> 
                <Text style={styles.buttonText}>Submit</Text> 
            </TouchableOpacity> 
            <Text style={styles.timerText}>{`Time remaining: ${timer} seconds`}</Text> 
            {timer === 0 && ( 
                <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}> 
                <Text style={styles.resendButtonText}>Resend Code</Text> 
                </TouchableOpacity> 
            )} 
            </View> 
        </ScrollView> 
        </KeyboardAvoidingView> 
    ); 
}; 
 
const styles = StyleSheet.create({ 
    container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
    container1: {
		backgroundColor: '#48c289',
		width: '100%',
		alignSelf: 'flex-start',
		padding: 20,
		paddingBottom: 10,
		marginBottom: 50,
	},
    header: {
		color: '#fff',
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 20,
  	}, 
    instruction: {
		color: '#000',
		fontSize: 19,
		fontWeight: 'bold',
        marginTop: 50,
        paddingRight: 95,
  	}, 
    description: { 
        color: '#000',
		fontSize: 12,
		fontStyle: 'italic',
		marginBottom: 20,
        paddingRight: 48,
    }, 
    input: { 
        width: '80%', 
        height: 40, 
        borderColor: '#000', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginBottom: 10, 
        paddingHorizontal: 10, 
    }, 
    button: { 
        backgroundColor: '#48c289', 
        width: '80%', 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 5, 
        marginTop: 10, 
    }, 
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 18, 
    }, 
    timerText: { 
        marginTop: 20, 
        fontSize: 15, 
    }, 
    resendButton: { 
        marginTop: 10, 
    }, 
    resendButtonText: { 
        color: 'blue', 
        fontSize: 15, 
        textDecorationLine: 'underline', 
    }, 
}); 
 
export default PhoneVerificationScreen;