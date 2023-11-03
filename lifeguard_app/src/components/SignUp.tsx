import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {FontSize, FontFamily, Border, Color} from '../GlobalStyles';
import {Dimensions} from 'react-native';
import Login from './Login';
import axios from 'axios';
import {signUp} from '../../auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({navigation}: {navigation: any}) => {
  const [input_password, onChangePassword] = React.useState('0');
  const [input_email, onChangeEmail] = React.useState('0');
  const [input_username, onChangeUsername] = React.useState('');
  const [input_phone, onChangePhone] = React.useState('');

  const signUpSubmit = async () => {
    // 회원가입 함수
    try {
      const {user} = await signUp(input_email, input_password);
      console.log(user);
      userdata();
      Alert.alert('회원가입에 성공하였습니다.');
    } catch (error) {
      Alert.alert('회원가입에 실패하였습니다.');
    }
  };

  const userdata = () => {
    axios
      .get('http://10.0.2.2:8080/sign/userSignUp', {
        params: {
          id: input_email,
          pw: input_password,
          name: input_username,
          phone: input_phone,
          email: input_email,
        },
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.signUp}>
        <Text style={styles.signUp_text}>SIGN UP</Text>
        <View style={[styles.email_Rectangle, styles.signChildLayout1]} />
        <TextInput
          style={[styles.email_Rectangle, styles.signChildLayout1]}
          onChangeText={onChangeEmail}
          placeholder="xxxx@example.com"
        />
        <Text style={[styles.emailPosition, styles.email]}>E-mail</Text>
        <View style={[styles.password_Rectangle, styles.signChildLayout1]} />
        <TextInput
          style={[styles.password_Rectangle, styles.signChildLayout1]}
          onChangeText={onChangePassword}
          placeholder="6자리 이상"
        />
        <Text style={[styles.password, styles.passwordPosition]}>Password</Text>
        <View style={[styles.username_Rectangle, styles.signChildLayout1]} />
        <TextInput
          style={[styles.username_Rectangle, styles.signChildLayout1]}
          onChangeText={onChangeUsername}
        />
        <Text style={[styles.username, styles.usernamePosition]}>Username</Text>
        <View style={[styles.phone_Rectangle, styles.signChildLayout1]} />
        <TextInput
          style={[styles.phone_Rectangle, styles.signChildLayout1]}
          onChangeText={onChangePhone}
        />
        <Text style={[styles.phoneNumber, styles.phoneNumberPosition]}>
          Phone number
        </Text>
        <TouchableOpacity
          style={[styles.registerInner, styles.signChildLayout1]}
          onPress={signUpSubmit}>
          <Text style={[styles.signUp_text2, styles.signUp2Typo]}>sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signUpInner, styles.signChildLayout1]}
          onPress={() => navigation.navigate(Login)}>
          <Text style={styles.signUp2Typo}>sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  signChildLayout1: {
    height: 40,
    width: 298,
    position: 'absolute',
  },
  signUp2Typo: {
    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    position: 'absolute',
  },
  email: {
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    color: Color.black,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    width: 290,
  },
  passwordPosition: {
    top: windowHeight - 450,
    position: 'absolute',
  },
  usernamePosition: {
    top: windowHeight - 370,
    position: 'absolute',
  },
  phoneNumberPosition: {
    top: windowHeight - 280,
    position: 'absolute',
  },
  emailPosition: {
    top: windowHeight - 540,
    position: 'absolute',
    alignItems: 'center',
  },
  signUp_text: {
    top: windowHeight - 600,
    fontSize: FontSize.size_29xl,
    display: 'flex',
    alignItems: 'center',
    width: windowWidth,
    height: 102,
    textAlign: 'center',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 50,
    letterSpacing: 0,
    color: Color.black,
    position: 'absolute',
  },
  email_Rectangle: {
    top: windowHeight - 510,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: Color.black,
    borderRadius: Border.br_31xl,
    width: 298,
    backgroundColor: Color.white,
  },
  password_Rectangle: {
    top: windowHeight - 430,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: Color.black,
    borderRadius: Border.br_31xl,
    width: 298,
    backgroundColor: Color.white,
  },
  signUpInner: {
    alignItems: 'center',
    top: windowHeight - 120,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.forestgreen,
    justifyContent: 'center',
  },
  registerInner: {
    alignItems: 'center',
    top: windowHeight - 180,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.forestgreen,
    justifyContent: 'center',
  },
  signUp_text2: {
    color: Color.white,
    fontSize: FontSize.size_mini,
    position: 'absolute',
  },
  password: {
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    color: Color.black,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 15,
    letterSpacing: 0,
    width: 290,
  },
  username_Rectangle: {
    top: windowHeight - 340,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: Color.black,
    borderRadius: Border.br_31xl,
    width: 298,
    backgroundColor: Color.white,
  },
  username: {
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    color: Color.black,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    width: 290,
  },
  phone_Rectangle: {
    top: windowHeight - 260,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: Color.black,
    borderRadius: Border.br_31xl,
    width: 298,
    backgroundColor: Color.white,
  },
  phoneNumber: {
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 15,
    letterSpacing: 0,
    color: Color.black,
    width: 290,
  },
  signUp: {
    width: windowWidth,
    height: windowHeight,
    overflow: 'hidden',
    backgroundColor: Color.white,
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default SignUp;
