import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Alert,
  Button,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Border, Color, FontSize, FontFamily} from '../GlobalStyles';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}: {navigation: any}) => {
  const [id, onChangeId] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.login}>
        <Text style={styles.login1}>Login</Text>
        <TextInput
          style={[styles.idBox, styles.loginShadowBox]}
          onChangeText={onChangeId}
          value={id}
          placeholder="이메일 입력"
        />
        <TextInput
          style={[styles.passwordBox, styles.loginShadowBox]}
          onChangeText={onChangePassword}
          value={password}
          placeholder="비밀번호 입력"
        />
        <TouchableOpacity
          style={[styles.loginInner, styles.loginLayout]}
          onPress={() => navigation.navigate('List')}>
          <Text style={styles.signTypo}>sign in</Text>
        </TouchableOpacity>
        <Text style={[styles.id, styles.idTypo]}>ID</Text>
        <Text style={[styles.password, styles.passwordPosition]}>Password</Text>
        <TouchableOpacity
          style={[styles.signupBox, styles.loginLayout]}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signTypo}>sign up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginShadowBox: {
    height: 40,
    width: 298,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: Color.black,
    borderRadius: Border.br_31xl,
    position: 'absolute',
    backgroundColor: Color.white,
  },
  loginLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.forestgreen,
    borderRadius: Border.br_3xs,
    height: 34,
    width: 298,
    position: 'absolute',
  },
  signTypo: {
    color: Color.white,
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    position: 'absolute',
  },
  idTypo: {
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
    top: windowHeight - 280,
    position: 'absolute',
  },
  login1: {
    top: windowHeight - 600,
    fontSize: FontSize.size_29xl,
    display: 'flex',
    width: windowWidth,
    height: 89,
    textAlign: 'center',
    color: Color.black,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 50,
    letterSpacing: 0,
    position: 'absolute',
  },
  idBox: {
    top: windowHeight - 320,
  },
  passwordBox: {
    top: windowHeight - 250,
  },
  loginInner: {
    top: windowHeight - 170,
  },
  signIn: {
    top: windowHeight - 167,
  },
  id: {
    top: windowHeight - 350,
    position: 'absolute',
  },
  loginChild1: {
    height: 24,
    width: 156,
    borderRadius: Border.br_31xl,
    left: 38,
    backgroundColor: Color.white,
  },
  password: {
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    color: Color.black,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0,
    width: 290,
  },
  arrowIcon: {
    top: 812,
    left: 176,
    width: 22,
    height: 0,
    position: 'absolute',
  },
  signupBox: {
    top: windowHeight - 100,
  },
  signUp: {
    top: windowHeight - 97,
  },
  login: {
    width: windowWidth,
    height: windowHeight,
    overflow: 'hidden',
    backgroundColor: Color.white,
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
