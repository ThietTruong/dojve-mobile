import {Searchbar} from 'react-native-paper';
import {ScrollView ,TouchableHighlight, TextInput, StyleSheet, KeyboardAvoidingView,View,FlatList,Image, Modal} from 'react-native';
import axios from "../../utility/axios";
import { debounce } from "lodash";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAccessoryView} from 'react-native-ui-lib/keyboard';
import React, { useRef, useEffect, useState } from "react";
const apiKey = "7oleYFqKiRberKvCCXQQDw0ki0IcmQfu";
const ENDPOINT = "https://api.giphy.com/v1/gifs";
// const getTrendingGif = (callback) => {
//   console.log("get trending")
//   axios
//     .get(`${ENDPOINT}/trending?api_key=${apiKey}&limit=30&rating=pg-13`)
//     .then((res) => {
//       const { data } = res;
//       console.log(res);
//       callback(data.data);
//     }).catch(err=>console.log(err))
// };
// const getSearchGif = (q, callback) => {
//   axios
//     .get(`${ENDPOINT}/search?api_key=${apiKey}&limit=30&rating=pg-13&q=${q}`)
//     .then((res) => {
//       const { data } = res;
//       console.log(res);
//       callback(data.data);
//     });
// };
// function Gif({ sendAMessage }) {
//   const [gifs, setGifs] = useState([]);
//   const [keyword, setKeyword] = useState("");
//   useEffect(() => {
//     console.log("render");
//     axios.get("/sticker/getTrendingPack").then((res) => {
//       const { data } = res;
//       console.log(res);
//       if (data.header?.code === "0000" && !data.error) {
//         setGifs(data.body.packageList);
//         console.log(data.body.packageList[0].packageImg)
//         // setSelectPack(data.body.packageList[0].packageId);
//         // onChangePack(data.body.packageList[0].packageId);
//       } else message.error("Some thing went wrong :( Try again later");
//     });
//   }, []);
//   const fetchGifSearch = (q) => {
//     getSearchGif(q, setGifs);
//   };
//   const debounceFetchGif = useRef(debounce((q) => fetchGifSearch(q), 1000))
//     .current;
//    console.log("vai lon ")
//   const sendAGif = (gif) => {
//     sendAMessage(2, gif);
//   };
//   const onSearchGif = (e) => {
//     const q = e.value;
//     setKeyword(q);
//     if (e.value === null) {
//       setGifs([]);
//       getTrendingGif(setGifs);
//     } else {
//       setKeyword(q);
//       setGifs([]);
//       debounceFetchGif(q);
//     }
//   };
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
    sendAMessage(2, gif);
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
        numColumns={5}
        columnWrapperStyle={styles.row}
        data={gifs}
        renderItem={({item}) => (
          <TouchableHighlight onPress={() => sendAGif(item.images.original.url)}>
          <Image
             key={item.id}
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
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: "column"
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'white'
  },
  row: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: 3,
    margin: "auto",
    justifyContent: "space-evenly"
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

// import React, {useState} from 'react';
// import {View, TextInput, StyleSheet, FlatList, Image, ScrollView} from 'react-native';
// export default function Gif() {
//   const [gifs, setGifs] = useState([]);
//   const [term, updateTerm] = useState('');
//   async function fetchGifs() {
//     try {
//       const API_KEY = 'id2d5LvDpB5in7Z1l5W2RuKJKhnobg0X';
//       const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
//       const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}`);
//       const res = await resJson.json();
//       setGifs(res.data);
//       console.log(setGifs);
//     } catch (error) {
//       console.warn(error);
//     }
//   }
//   function onEdit(newTerm) {
//     updateTerm(newTerm);
//     fetchGifs();
//   }
//   return (
//     <View style={styles.view}>
//       <Searchbar
//         placeholder="Search Giphy"
//         placeholderTextColor='black'
//         style={styles.textInput}
//         onChangeText={(text) => onEdit(text)}
//       />
//       <FlatList>
//       <ScrollView
//         data={gifs}
//         renderItem={({item}) => (
//           <Image
//             resizeMode='contain'
//             style={styles.image}
//             source={{uri: item.images.original.url}}
//           />
//         )}
//           />
//       </FlatList>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white'
//   },
//   textInput: {
//     width: '100%',
//     height: 50,
//     color: 'gray'
//   },
//   image: {
//     width: 300,
//     height: 150,
//     borderWidth: 3,
//     marginBottom: 5
//   },
// });