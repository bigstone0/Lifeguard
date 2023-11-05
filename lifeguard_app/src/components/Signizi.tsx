import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import Styled from 'styled-components/native';
import MapView, {Marker} from 'react-native-maps';
import {Color, Border, FontFamily, FontSize} from '../GlobalStyles';
import {Dimensions} from 'react-native';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {CameraOptions, launchCamera} from 'react-native-image-picker';

// const Tab = createMaterialBottomTabNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = Styled.View`
    flex: 1;
`;

type ButtonProps = {
  stat: string;
};

interface ILocation {
  latitude: number;
  longitude: number;
}

async function requestPermissions() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // do something if granted...
    }
  }
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // do something if granted...
    }
  }
}

const Signizi = ({route, navigation}: any) => {
  requestPermissions();
  const {lat, lng, name} = route.params;
  const [door, setdoor] = React.useState('');
  const [inner, setinner] = React.useState('');
  const [btState, setbtState] = React.useState(true);
  const [btStyle, setbtStyle] = React.useState(styles.disabledStatus);
  const [flag, setflag] = React.useState(false);
  const [qrflag, qrsetflag] = React.useState(false);

  const [location, setLocation] = React.useState<ILocation | undefined>(
    undefined,
  );

  const [modalVisible, setModalVisible] = React.useState(true);

  // const onPickImage = (res: any) => {
  //   if (res.didCancel || !res) {
  //     return;
  //   }
  //   console.log('PickImage', res);
  // };
  React.useEffect(() => {
    d_state();
    i_state();
    setInterval(() => {
      d_state();
      i_state();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    flag_state();
    setInterval(() => {
      flag_state();
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flag_state = () => {
    axios
      .get('http://192.168.193.19:8080/lifeguard/checkWarning')
      .then(response => setflag(response.data))
      .catch(error => {
        console.log(error);
      });
  };

  const d_state = () => {
    axios
      .get('http://192.168.193.19:8080/lifeguard/namedoorState', {
        params: {
          name: name,
        },
      })
      .then(response => setdoor(response.data))
      .catch(error => {
        console.log(error);
      });
  };

  const i_state = () => {
    axios
      .get('http://192.168.193.19:8080/lifeguard/nameinnerState', {
        params: {
          name: name,
        },
      })
      .then(response => setinner(response.data))
      .catch(error => {
        console.log(error);
      });
  };

  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    quality: 1,
  };

  const onLaunchCamera = () => {
    launchCamera(options);
  };

  const btnDisabled = () => {
    setbtState(false);
    setbtStyle(styles.status);
    setModalVisible(false);
    qrsetflag(true);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Switch = () => {
    if (door === 'open') {
      setdoor('closed');
      setinner('occupied');
      Alert.alert('door closed');
      doorSwitch('closed', 'occupied');
      return <Text style={styles.close}>{door}</Text>;
    }
    if (door === 'closed') {
      setdoor('open');
      Alert.alert('door open');
      doorSwitch('open', inner);
      return <Text style={styles.open}>{door}</Text>;
    }
  };

  const doorSwitch = (door_s: any, inner_s: any) => {
    axios
      .get('http://192.168.193.19:8080/lifeguard/doorclose', {
        params: {
          name: name,
          doorState: door_s,
          innerState: inner_s,
        },
      })
      .catch(function () {
        console.log('실패함');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Buttons = (props: ButtonProps) => {
    if (props.stat === 'open') {
      return <Text style={styles.open}>{props.stat}</Text>;
    }
    if (props.stat === 'closed') {
      return <Text style={styles.close}>{props.stat}</Text>;
    }
  };

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log('error.code, error.message');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    // <Text>
    //   ${location?.latitude},${location?.longitude}
    // </Text>
    <View style={[styles.signizi, styles.barBg]}>
      {location && (
        <MapView
          style={styles.signizi}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={{latitude: lat, longitude: lng}} />
        </MapView>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
          <Text style={[styles.backtext]}>back</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={{flex: 1, backgroundColor: 'transparent'}}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <View style={[styles.bar, styles.barPosition]}>
          <TouchableOpacity
            style={[styles.pill, styles.closePillPosition]}
            onPress={() => setModalVisible(!modalVisible)}></TouchableOpacity>
          <View style={styles.ourier1}>
            <TouchableOpacity
              style={btStyle}
              onPress={Switch}
              disabled={btState}>
              <Buttons stat={door} />
            </TouchableOpacity>
            <Text style={[styles.text, styles.textTypo]}>{name}</Text>
            <Text style={[styles.text1, styles.textTypo]}>
              {'현재 상태 : '}
              {inner}
            </Text>
            <View style={[styles.line, styles.lineLayout]} />
            <View style={[styles.line1, styles.lineLayout]} />
          </View>
          <View style={styles.ourier}>
            <Image
              style={[styles.pxphotoIcon, styles.qrIconLayout]}
              resizeMode="cover"
              source={require('../assets/photo.png')}
            />
            <TouchableOpacity
              style={[styles.qrIcon, styles.qrIconLayout]}
              onPress={btnDisabled}
              disabled={!btState}>
              <Image
                style={styles.qrIconLayout}
                source={require('../assets/QRcode.png')}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text style={[styles.daeseokSim, styles.qrTypo]}>Daeseok Sim</Text>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={flag}
        onRequestClose={() => {
          setflag(!flag);
        }}>
        <Pressable
          style={{flex: 1, backgroundColor: 'transparent'}}
          onPress={() => setflag(!flag)}
        />
        <View style={[styles.warningbar, styles.warningbarPosition]}>
          <View style={styles.warningourier}>
            <Text style={[styles.text1, styles.warningtextTypo]}>
              {'Warning!!'}
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={qrflag}
        onRequestClose={() => {
          setflag(!qrflag);
        }}>
        <Pressable
          style={{flex: 1, backgroundColor: 'transparent'}}
          onPress={() => qrsetflag(!qrflag)}
        />
        <View style={[styles.camerabar, styles.warningbarPosition]}>
          <View style={styles.warningourier}>
            <Text style={[styles.text1, styles.warningtextTypo]}>
              {'카메라를 키고 QR코드를 찍으세요'}
            </Text>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.blackPill, styles.openPillPosition]}
        onPress={() => setModalVisible(!modalVisible)}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  barBg: {
    backgroundColor: Color.white,
  },
  barPosition: {
    bottom: '0%',
  },
  warningbarPosition: {
    bottom: '60%',
  },
  closePillPosition: {
    top: 5,
    position: 'absolute',
  },
  openPillPosition: {
    top: windowHeight - 50,
    position: 'absolute',
  },
  qrTypo: {
    color: Color.black,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    position: 'absolute',
  },
  textTypo: {
    lineHeight: 24,
    color: Color.black,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    position: 'absolute',
  },
  warningtextTypo: {
    lineHeight: 24,
    color: Color.red,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    position: 'absolute',
  },
  backtext: {
    lineHeight: 24,
    color: Color.black,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
  },
  lineLayout: {
    height: 1,
    width: 343,
    backgroundColor: Color.gainsboro,
    left: 16,
    position: 'absolute',
  },
  qrIconLayout: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
  status: {
    top: 35,
    backgroundColor: Color.honeydew,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: 30,
    width: 85,
    borderRadius: Border.br_10xs,
    right: 0,
    position: 'absolute',
  },
  disabledStatus: {
    top: 35,
    backgroundColor: Color.darkgray,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: 30,
    width: 85,
    borderRadius: Border.br_10xs,
    right: 0,
    position: 'absolute',
  },
  open: {
    color: Color.blue,
    fontWeight: '900',
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    lineHeight: 16,
    position: 'absolute',
  },
  close: {
    color: Color.red,
    fontWeight: '900',
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    lineHeight: 16,
    position: 'absolute',
  },
  text: {
    top: 35,
    fontSize: 20,
  },
  text1: {
    top: 92,
    fontSize: FontSize.size_lgi,
  },
  bar: {
    alignContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: Border.br_31xl,
    borderTopRightRadius: Border.br_31xl,
    overflow: 'hidden',
    backgroundColor: Color.white,
    height: 240,
    position: 'absolute',
    width: windowWidth,
  },
  warningbar: {
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: Border.br_31xl,
    overflow: 'hidden',
    backgroundColor: Color.white,
    height: 240,
    position: 'absolute',
    width: windowWidth,
    borderWidth: 3,
    borderColor: Color.red,
    color: Color.red,
  },
  camerabar: {
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: Border.br_31xl,
    overflow: 'hidden',
    backgroundColor: Color.white,
    height: 240,
    position: 'absolute',
    width: windowWidth,
    borderWidth: 3,
    borderColor: Color.black,
    color: Color.black,
  },
  line: {
    top: 72,
  },
  line1: {
    top: 175,
  },
  pill: {
    marginTop: 10,
    marginLeft: -35.5,
    borderRadius: 4,
    backgroundColor: 'rgba(184, 184, 184, 0.4)',
    width: 150,
    height: 20,
  },
  blackPill: {
    marginTop: 0,
    marginLeft: -35.5,
    borderRadius: 4,
    backgroundColor: Color.black,
    width: 150,
    height: 20,
  },
  qrIcon: {
    marginTop: -20,
    top: '50%',
    right: '3%',
  },
  pxphotoIcon: {
    marginTop: -20,
    top: '50%',
    left: 0,
  },
  daeseokSim: {
    top: 5,
    left: 52,
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    color: Color.black,
  },
  ourier1: {
    height: 170,
    width: windowWidth - 60,
    position: 'absolute',
  },
  warningourier: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
    width: windowWidth - 60,
    position: 'absolute',
  },
  ourier: {
    top: 185,
    height: 40,
    width: windowWidth - 60,
    position: 'absolute',
  },
  signizi: {
    borderRadius: Border.br_base,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  buttons: {
    borderRadius: 10,
    top: '2%',
    left: '2%',
    height: 30,
    width: 50,
    position: 'absolute',
    backgroundColor: Color.honeydew,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Signizi;
