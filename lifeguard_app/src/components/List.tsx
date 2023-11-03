import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
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
    d_state();
    i_state();
    n_state();
    setInterval(() => {
      d_state();
      i_state();
      n_state();
    }, 5000);
  }, []);

  const d_state = () => {
    axios
      .get('http://192.168.193.20:8080/lifeguard/doorState')
      .then(response => setdoor_state(response.data))
      .catch(error => {
        console.log(error);
      });
  };

  const i_state = () => {
    axios
      .get('http://192.168.193.20:8080/lifeguard/innerState')
      .then(response => setinner_state(response.data))
      .catch(error => {
        console.log(error);
      });
  };

  const n_state = () => {
    axios
      .get('http://192.168.193.20:8080/lifeguard/name')
      .then(response => setName(response.data))
      .catch(error => {
        console.log(error);
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        <View style={styles.list}>
          <TouchableOpacity
            style={[styles.signizi_rectangle1, styles.signizi_rectangle_layout]}
            onPress={() =>
              navigation.navigate('Signizi', {
                lat: signizi_lat[0],
                lng: signizi_lng[0],
                name: name[0],
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
    top: windowHeight - 1000,
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
