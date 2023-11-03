import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Border, Color, FontSize, FontFamily} from '../GlobalStyles';
import {Dimensions} from 'react-native';
import {signIn} from '../../auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}: {navigation: any}) => {
  const [id, onChangeId] = React.useState('0');
  const [password, onChangePassword] = React.useState('0');

  const signInSubmit = async () => {
    try {
      const {user} = await signIn(id, password);
      console.log(user);
      navigation.navigate('List');
    } catch (error) {
      Alert.alert('로그인에 실패했습니다.');
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.login}>
        <Text style={styles.login1}>Login</Text>
        <TextInput
          style={[styles.idBox, styles.loginShadowBox]}
          onChangeText={onChangeId}
          placeholder="이메일 입력"
        />
        <TextInput
          style={[styles.passwordBox, styles.loginShadowBox]}
          onChangeText={onChangePassword}
          placeholder="비밀번호 입력"
        />
        <TouchableOpacity
          style={[styles.loginInner, styles.loginLayout]}
          onPress={signInSubmit}>
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
    </KeyboardAwareScrollView>
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
    top: '56%',
    position: 'absolute',
  },
  login1: {
    top: '20%',
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
    top: '50%',
  },
  passwordBox: {
    top: '58%',
  },
  loginInner: {
    top: '70%',
  },
  id: {
    top: '48%',
    position: 'absolute',
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
  signupBox: {
    top: '75%',
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
