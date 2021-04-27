import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '../feature/user';
import {rooms, setRooms} from '../feature/rooms';
import {connectSocket} from '../feature/socketClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../utility/axios';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const [account, setAccount] = useState({
    email: '',
    password: '',
  });
  const textInputChange = val => {
    if (val.length !== 0) {
      setAccount({
        ...account,
        email: val,
      });
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handleChangePassword = val => {
    setAccount({
      ...account,
      password: val,
    });
    setData({
      ...data,
      password: val,
    });
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
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
        navigation.navigate('Chat');
      } else {
        console.log(data);
      }
    });
    //
  }, []);
  const handleSignIn = () => {
    axios
      .post('auth/signin', account)
      .then(async res => {
        const {data} = res;
        if (!data.error) {
          let user = data.user;
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
          navigation.navigate('Chat');
        } else {
          Alert.alert(data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Wellcome !!!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05735a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05735a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => handleChangePassword(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="green" size={20} />
            ) : (
              <Feather name="eye" color="green" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={{
              width: '100%',
            }}
            onPress={() => handleSignIn()}>
            <LinearGradient
              colors={['#08d4ce', '#01ad9b']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Signin
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
