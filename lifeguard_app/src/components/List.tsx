import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {FontFamily, FontSize, Color, Border} from '../GlobalStyles';
import {Dimensions} from 'react-native';
import axios from 'axios';

type ButtonProps = {
  stat: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const signizi_lat = [36.962751, 37.340864, 33.339688, 35.342061];
const signizi_lng = [126.825249, 126.735699, 126.73558, 126.736551];

const List = ({navigation}: {navigation: any}) => {
  const [door_state, setdoor_state] = React.useState([]);
  const [inner_state, setinner_state] = React.useState([]);
  const [name, setName] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://10.0.2.2:8080/lifeguard/doorState')
      .then(response => setdoor_state(response.data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get('http://10.0.2.2:8080/lifeguard/innerState')
      .then(response => setinner_state(response.data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get('http://10.0.2.2:8080/lifeguard/name')
      .then(response => setName(response.data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Buttons = (props: ButtonProps) => {
    if (props.stat === 'open') {
      return <Text style={styles.open}>{props.stat}</Text>;
    }
    if (props.stat === 'closed') {
      return <Text style={styles.close}>{props.stat}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        <View style={styles.list}>
          <View style={styles.listItem} />
          <TouchableOpacity
            style={[styles.signizi_rectangle1, styles.signizi_rectangle_layout]}
            onPress={() =>
              navigation.navigate('Signizi', {
                lat: signizi_lat[0],
                lng: signizi_lng[0],
                name: name[0],
                doorstate: door_state[0],
                innerstate: inner_state[0],
              })
            }>
            <Text style={[styles.nameText]}>{name[0]}</Text>
            <View style={styles.line} />
            <Text style={styles.statusText}>
              {'현재 상태 : '}
              {inner_state[0]}
            </Text>
            <View style={styles.statusBox}>
              <Buttons stat={door_state[0]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.signizi_rectangle2, styles.signizi_rectangle_layout]}
            onPress={() =>
              navigation.navigate('Signizi', {
                lat: signizi_lat[1],
                lng: signizi_lng[1],
                name: name[1],
                doorstate: door_state[1],
                innerstate: inner_state[1],
              })
            }>
            <Text style={[styles.nameText]}>{name[1]}</Text>
            <View style={styles.line} />
            <Text style={styles.statusText}>
              {'현재 상태 : '}
              {inner_state[1]}
            </Text>
            <View style={styles.statusBox}>
              <Buttons stat={door_state[1]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.signizi_rectangle3, styles.signizi_rectangle_layout]}
            onPress={() =>
              navigation.navigate('Signizi', {
                lat: signizi_lat[2],
                lng: signizi_lng[2],
                name: name[2],
                doorstate: door_state[2],
                innerstate: inner_state[2],
              })
            }>
            <Text style={[styles.nameText]}>{name[2]}</Text>
            <View style={styles.line} />
            <Text style={styles.statusText}>
              {'현재 상태 : '}
              {inner_state[2]}
            </Text>
            <View style={styles.statusBox}>
              <Buttons stat={door_state[2]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.signizi_rectangle4, styles.signizi_rectangle_layout]}
            onPress={() =>
              navigation.navigate('Signizi', {
                lat: signizi_lat[3],
                lng: signizi_lng[3],
                name: name[3],
                doorstate: door_state[3],
                innerstate: inner_state[3],
              })
            }>
            <Text style={[styles.nameText]}>{name[3]}</Text>
            <View style={styles.line} />
            <Text style={styles.statusText}>
              {'현재 상태 : '}
              {inner_state[3]}
            </Text>
            <View style={styles.statusBox}>
              <Buttons stat={door_state[3]} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardLayout: {
    height: 119,
    width: 343,
  },
  tabsPosition: {
    left: 0,
    position: 'absolute',
  },
  tabLayout: {
    height: 86,
    left: 0,
    position: 'absolute',
    width: 375,
  },
  labelPosition: {
    width: 90,
    textAlign: 'center',
    fontFamily: FontFamily.sFProText,
    lineHeight: 16,
    letterSpacing: 1,
    fontSize: FontSize.size_29xl,
    bottom: 0,
    marginLeft: -44.75,
    left: '50%',
    position: 'absolute',
  },
  houseIconPosition: {
    left: '50%',
    position: 'absolute',
  },
  listChildLayout1: {
    flex: 1,
    height: 27,
    width: 313,
    position: 'absolute',
    backgroundColor: Color.white,
  },
  textTypo3: {
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    left: 35,
    position: 'absolute',
  },

  textTypo2: {
    top: 418,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    left: 35,
    lineHeight: 16,
    position: 'absolute',
  },
  textTypo1: {
    left: 38,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    position: 'absolute',
  },

  closeTypo: {
    color: Color.red,
    height: 20,
    width: 50,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    fontSize: FontSize.size_mini,
    lineHeight: 16,
    position: 'absolute',
  },
  textTypo: {
    left: 31,
    color: Color.black,
    lineHeight: 24,
    fontSize: FontSize.size_lgi,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    position: 'absolute',
  },
  background: {
    borderRadius: Border.br_7xs,
    top: 0,
    backgroundColor: Color.white,
    height: 119,
    width: 343,
  },
  card1: {
    top: 124,
    left: 15,
    width: 343,
    position: 'absolute',
  },
  tabBarChild: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    top: 0,
    backgroundColor: Color.white,
  },
  label: {
    fontWeight: '500',
    color: Color.primary,
  },
  houseIcon: {
    marginTop: -20,
    marginLeft: -11.75,
    top: '50%',
    width: 24,
    height: 24,
  },
  home: {
    flex: 1,
    height: 40,
  },
  label1: {
    color: Color.textGrey,
  },
  tabs: {
    top: 12,
    flexDirection: 'row',
    width: 375,
  },
  tabBar: {
    top: 726,
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: 100,
    width: 134,
    height: 5,
    backgroundColor: Color.darkslategray,
  },
  homeindicator: {
    marginLeft: -187.5,
    top: 778,
    height: 34,
    width: 375,
  },
  listChild: {
    top: 133,
    left: 25,
    width: 313,
  },
  text: {
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    left: 35,
    lineHeight: 16,
    top: 140,
    color: Color.primary,
  },

  card12: {
    top: 263,
    left: 15,
    width: 343,
    position: 'absolute',
  },
  rectangleView: {
    top: 272,
    left: 25,
    width: 313,
  },
  text4: {
    top: 279,
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    left: 35,
    lineHeight: 16,
    color: Color.primary,
  },

  text5: {
    top: 333,
    color: Color.black,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    left: 35,
    position: 'absolute',
    lineHeight: 24,
    fontSize: FontSize.size_lgi,
  },
  text6: {
    top: 279,
    color: Color.black,
    fontSize: FontSize.size_mini,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    left: 35,
    lineHeight: 16,
  },
  card14: {
    top: 402,
    left: 15,
    width: 343,
    position: 'absolute',
  },
  listChild2: {
    top: 411,
    left: 25,
    width: 313,
  },
  text7: {
    color: Color.primary,
  },
  open2: {
    top: 414,
    left: 290,
    height: 20,
    width: 50,
    color: Color.blue,
  },
  text8: {
    top: 472,
    color: Color.black,
    textAlign: 'left',
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: '600',
    letterSpacing: 0,
    left: 35,
    position: 'absolute',
    lineHeight: 24,
    fontSize: FontSize.size_lgi,
  },
  text9: {
    color: Color.black,
  },
  card16: {
    left: 18,
    top: 541,
    position: 'absolute',
  },
  listChild4: {
    top: 550,
    left: 28,
  },
  text10: {
    top: 557,
    left: 38,
    fontSize: FontSize.size_mini,
    lineHeight: 16,
    color: Color.primary,
  },
  open3: {
    left: 293,
    top: 553,
  },
  text11: {
    top: 611,
    color: Color.black,
    lineHeight: 24,
    fontSize: FontSize.size_lgi,
  },
  text12: {
    top: 557,
    left: 38,
    fontSize: FontSize.size_mini,
    lineHeight: 16,
    color: Color.black,
  },
  listChild7: {
    top: 266,
    left: 23,
  },
  listChild8: {
    left: 20,
    top: 402,
  },
  listChild9: {
    top: 541,
    left: 22,
    height: 116,
    backgroundColor: Color.lightgray,
  },

  status1: {
    left: 242,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.honeydew,
    borderRadius: Border.br_10xs,
    top: 279,
  },
  open4: {
    top: 143,
    left: 268,
  },
  status2: {
    left: 242,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.honeydew,
    borderRadius: Border.br_10xs,
    top: 414,
  },
  open5: {
    top: 416,
    left: 268,
  },
  status3: {
    left: 245,
    top: 553,
  },
  close1: {
    top: 555,
    left: 271,
  },
  text14: {
    top: 467,
  },
  text15: {
    top: 606,
  },
  arrowIcon: {
    top: 341,
    left: 375,
    width: 228,
    height: 22,
    position: 'absolute',
  },

  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'white',
    alignContent: 'center',
  },
  list: {
    borderRadius: 16,
    height: windowHeight,
    overflow: 'hidden',
    width: windowWidth,
    backgroundColor: Color.white,
    alignItems: 'center',
    alignContent: 'center',
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: Border.br_3xs,
    height: 40,
    top: windowHeight - 830,
    width: 380,
    position: 'absolute',
  },
  signizi_rectangle1: {
    top: windowHeight - 650,
  },
  signizi_rectangle2: {
    top: windowHeight - 500,
    backgroundColor: Color.lightgray,
  },
  signizi_rectangle3: {
    top: windowHeight - 350,
    backgroundColor: Color.lightgray,
  },
  signizi_rectangle4: {
    top: windowHeight - 200,
    backgroundColor: Color.lightgray,
  },
  signizi_rectangle5: {
    top: windowHeight - 50,
    backgroundColor: Color.lightgray,
  },
  signizi_rectangle6: {
    top: windowHeight + 100,
    backgroundColor: Color.lightgray,
  },
  signizi_rectangle_layout: {
    height: 120,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: Border.br_3xs,
    width: 350,
    position: 'absolute',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Color.black,
    top: 50,
    position: 'absolute',
  },
  nameText: {
    color: Color.black,
    fontSize: FontSize.size_lgi,
    textAlign: 'left',
    fontWeight: '600',
    left: 20,
    top: 10,
  },
  statusText: {
    top: 70,
    color: Color.black,
    fontFamily: FontFamily.montserratSemiBold,
    left: 15,
    position: 'absolute',
    lineHeight: 24,
    fontSize: FontSize.size_lgi,
  },
  statusBox: {
    top: 10,
    left: 220,
    height: 30,
    width: 90,
    position: 'absolute',
    backgroundColor: Color.honeydew,
    borderRadius: Border.br_10xs,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default List;
