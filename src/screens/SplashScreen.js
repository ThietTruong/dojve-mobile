import React,{useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../feature/user';
import {rooms, setRooms} from '../feature/rooms';
import {connectSocket} from '../feature/socketClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../utility/axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const SplashScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/auth/signinW').then(async res => {
      const {data} = res;
      if (!data.error) {
        let user = data.user;
        user.token = data.token;
        dispatch(setUser(user));
        dispatch(connectSocket(data.token));
        axios
          .get(`/rooms?token=${data.token}`)
          .then(res => {
            dispatch(setRooms(res.data.rooms));
          })
          .catch(err => {
            console.log(err);
          });
        await AsyncStorage.setItem('userToken', data.token);
        setIsLogin(true)
      } else {
        console.log(data);
      }
    });
  }, []);
  const handleGetStarted = () =>{
    if(isLogin){
      navigation.navigate('Chat');
    }
    else{
      navigation.navigate('SignInScreen')
    }
  }
  return (
    <View style={styles.container}>
      {/* <SpinnerScreen/> */}
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay connected with everyone!!</Text>
        <Text style={styles.text}>Signin in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={handleGetStarted}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
    borderColor: '#000',
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
