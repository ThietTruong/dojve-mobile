import {Searchbar} from 'react-native-paper';
import {ScrollView ,TouchableHighlight, TextInput, StyleSheet, KeyboardAvoidingView,View,FlatList,Image, Modal} from 'react-native';
import axios from "../../utility/axios";
import { debounce } from "lodash";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAccessoryView} from 'react-native-ui-lib/keyboard';
import React, { useRef, useEffect, useState } from "react";
const apiKey = "7oleYFqKiRberKvCCXQQDw0ki0IcmQfu";
const ENDPOINT = "https://api.giphy.com/v1/gifs";

const getTrendingGif = (callback) => {
  axios
    .get(`${ENDPOINT}/trending?api_key=${apiKey}&limit=30&rating=pg-13`)
    .then((res) => {
      const { data } = res;
      console.log(res);
      callback(data.data);
    });
};
const getSearchGif = (q, callback) => {
  axios
    .get(`${ENDPOINT}/search?api_key=${apiKey}&limit=30&rating=pg-13&q=${q}`)
    .then((res) => {
      const { data } = res;
      console.log(res);
      callback(data.data);
    });
};
function Gif({ sendAMessage }) {
  const [gifs, setGifs] = useState(undefined);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    getTrendingGif(setGifs);
  }, []);
  const fetchGifSearch = (q) => {
    getSearchGif(q, setGifs);
  };
  const debounceFetchGif = useRef(debounce((q) => fetchGifSearch(q), 1000))
    .current;
  const sendAGif = (gif) => {
    sendAMessage(1, gif);
  };
  const onSearchGif = (e) => {
    const q = e.value;
    setKeyword(q);
    if (e.value === null) {
      setGifs(undefined);
      getTrendingGif(setGifs);
    } else {
      setKeyword(q);
      setGifs(undefined);
      debounceFetchGif(q);
    }
  };
return (
    <View style={styles.view}>
    <Searchbar
          placeholder="Search GIFs"
          placeholderTextColor='black'
          style ={styles.input}
          value={keyword}
          onChange={onSearchGif}
        />
      <FlatList
        style={{margin:4}}
        numColumns={5}
        data={gifs}
        renderItem={({item}) => (
          <TouchableHighlight onPress={() => sendAGif(item.images.original.url)}>
          <Image
             resizeMode='contain'
             style={styles.image}
             source={{uri: item.images.original.url}}
           />
           </TouchableHighlight>  
          )
        }
      />
    </View>
    )
}
const styles = StyleSheet.create({
  view: {
    flex: 1, 
    margin: 5, 
    backgroundColor: 'white'
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'white'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 2,
    borderWidth: 3,
    margin: "auto",
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22
  },
  container: {
    height: '100%',
    marginTop: 'auto',
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  }
});

export default Gif;