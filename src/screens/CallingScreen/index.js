import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
const CallingScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.inforPartner}
        colors={['#0C211F', '#0A090F']}>
        <Animatable.View
          animation="rubberBand"
          iterationCount="infinite"
          style={styles.wrapDes}>
          <Image style={styles.avatar} />
          <View style={styles.des}>
            <Text style={styles.username}>User Name</Text>
            <Text style={styles.desCall}>Incoming Call</Text>
          </View>
        </Animatable.View>
      </LinearGradient>
      <View style={styles.action}>
        <Animatable.View
          animation="bounce"
          iterationCount="infinite"
          style={styles.buttonAction}>
          <LinearGradient
            colors={['#DA3344', '#CF1843']}
            style={styles.optionButton}>
            <TouchableOpacity>
              <Text style={{fontSize: 12}}>
                <FontAwesome5 name="phone-slash" size={22} color="#fff" />
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animatable.View>
        <Animatable.View
          animation="bounce"
          iterationCount="infinite"
          style={styles.buttonAction}>
          <LinearGradient
            colors={['#36D5A5', '#22BE77']}
            style={styles.optionButton}>
            <TouchableOpacity>
              <Text style={{fontSize: 12}}>
                <FontAwesome5 name="phone-alt" size={22} color="#fff" />
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inforPartner: {
    flex: 1,
    backgroundColor: '#0A090F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    width: '100%',
    height: 150,
    backgroundColor: '#0A090F',
    flexDirection: 'row',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
    backgroundColor: '#01ad9b',
    margin: 30,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 24,
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  buttonAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  des: {
    justifyContent: 'center',
  },
  desCall: {
    color: '#797E82',
    textAlign: 'center',
  },
  wrapDes: {
    padding: 80,

    borderRadius: 2000,
  },
});
export default CallingScreen;
