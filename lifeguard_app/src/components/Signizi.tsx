import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import Styled from 'styled-components/native';
import MapView, {Marker} from 'react-native-maps';
import {Color, Border, FontFamily, FontSize} from '../GlobalStyles';
import {Dimensions} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Login from './Login';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

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

const Signizi = ({route}: {route: any}) => {
  requestPermissions();
  const {lat, lng, name, doorstate, innerstate} = route.params;
  const [door, setdoor] = React.useState(doorstate);

  const [location, setLocation] = React.useState<ILocation | undefined>(
    undefined,
  );

  const [modalVisible, setModalVisible] = React.useState(true);

  React.useEffect(() => {
    console.log(lat, lng);
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const Switch = () => {
    if (door === 'open') {
      setdoor('closed');
      return <Text style={styles.close}>{door}</Text>;
    }
    if (door === 'closed') {
      setdoor('open');
      return <Text style={styles.open}>{door}</Text>;
    }
  };

  React.useEffect(() => {
    axios
      .get('http://10.0.2.2:8080/lifeguard/doorclose', {
        params: {
          name: name,
          doorState: door,
        },
      })
      .catch(function () {
        console.log('실패함');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [door]);

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
        console.log(error.code, error.message);
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
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.bar, styles.barPosition]}>
          <TouchableOpacity
            style={[styles.pill, styles.closePillPosition]}
            onPress={() => setModalVisible(!modalVisible)}></TouchableOpacity>
          <View style={styles.ourier1}>
            <TouchableOpacity style={styles.status} onPress={Switch}>
              <Buttons stat={door} />
            </TouchableOpacity>
            <Text style={[styles.text, styles.textTypo]}>{name}</Text>
            <Text style={[styles.text1, styles.textTypo]}>
              {'현재 상태 : '}
              {innerstate}
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
            <Text style={[styles.daeseokSim, styles.qrTypo]}>Daeseok Sim</Text>
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
  centeredView: {
    top: windowHeight - 700,
    position: 'absolute',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  barBg: {
    backgroundColor: Color.white,
  },
  barPosition: {
    top: windowHeight - 240,
  },
  closePillPosition: {
    top: 5,
    position: 'absolute',
  },
  openPillPosition: {
    top: windowHeight - 50,
    position: 'absolute',
  },
  statusFlexBox: {
    backgroundColor: Color.darkgray,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    borderRadius: Border.br_10xs,
    left: 255,
    position: 'absolute',
  },
  qrTypo: {
    color: Color.black,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    position: 'absolute',
  },
  open1Layout: {
    left: 280,
    height: 20,
    width: 50,
    lineHeight: 16,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
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
  lineLayout: {
    height: 1,
    width: 343,
    backgroundColor: Color.gainsboro,
    left: 16,
    position: 'absolute',
  },
  profileIconLayout: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
  qrIconLayout: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
  googleMap: {
    height: windowHeight,
    position: 'absolute',
    width: windowWidth,
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.darkslategray,
    width: 134,
    height: 5,
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
  status100: {
    top: 90,
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
  disabledStatus100: {
    top: 90,
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
  status200: {
    top: 135,
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
  disabledstatus200: {
    top: 135,
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
  open1: {
    top: 106,
    left: 280,
    height: 20,
    width: 50,
    lineHeight: 16,
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
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
  qr: {
    top: '-20%',
    right: 0,
    fontSize: 10,
    letterSpacing: 0,
    color: Color.black,
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
  line: {
    top: 72,
  },
  line1: {
    top: 175,
  },
  pill: {
    marginTop: 0,
    marginLeft: -35.5,
    borderRadius: 4,
    backgroundColor: 'rgba(184, 184, 184, 0.4)',
    width: 72,
    height: 10,
  },
  blackPill: {
    marginTop: 0,
    marginLeft: -35.5,
    borderRadius: 4,
    backgroundColor: Color.black,
    width: 72,
    height: 10,
  },
  navigationBar: {
    right: 0,
    bottom: 268,
    height: 16,
    left: 0,
    position: 'absolute',
  },
  qrIcon: {
    top: '20%',
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
  ourier: {
    top: 185,
    height: 40,
    width: windowWidth - 60,
    position: 'absolute',
  },
  signiziViews: {
    top: windowHeight - 310,
  },
  navigationBarIcon: {
    top: 47,
    height: 56,
    left: 0,
    position: 'absolute',
    width: 375,
  },
  signiziChild: {
    top: 341,
    left: 375,
    width: 212,
    height: 22,
    position: 'absolute',
  },
  backButton: {
    top: 100,
    width: 30,
  },
  signizi: {
    borderRadius: Border.br_base,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
});

export default Signizi;
