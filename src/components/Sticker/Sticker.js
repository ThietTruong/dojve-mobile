import React, { useEffect, useRef, useState } from "react";
import {Searchbar} from 'react-native-paper';
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import axios from "../../utility/axios";
import {ScrollView ,Button, TextInput, StyleSheet, KeyboardAvoidingView,View,FlatList,Image, Modal,Tooltip, TouchableHighlight} from 'react-native';
import {SkeletonPlaceholder} from "react-native-skeleton-placeholder";
import Skeleton from "react-loading-skeleton";
export default function Sticker({ sendAMessage }) {
  const user = useSelector((state) => state.user.current);
  const [packages, setPackages] = useState(undefined);
  const [selectPack, setSelectPack] = useState(undefined);
  const [stickers, setStickers] = useState(undefined);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    axios.get("/sticker/getTrendingPack").then((res) => {
      const { data } = res;
      if (data.header.code === "0000") {
        setPackages(data.body.packageList);
        setSelectPack(data.body.packageList[0].packageId);
        onChangePack(data.body.packageList[0].packageId);
      }
    });
  }, [user]);
  const onChangePack = (packId) => {
    setSelectPack(packId);
    setStickers(undefined);
    axios.get(`/sticker/getSticker/${packId}`).then((res) => {
      const { data } = res;
      if (data.header.code === "0000") {
        setStickers(res.data.body.package.stickers);
      }
    });
  };
  const sendSticker = (linkSticker) => {
    sendAMessage(3, linkSticker);
  };
  const fetchStickerSearched = (q) => {
    axios.get(`/sticker/search?q=${q}`).then((res) => {
      console.log(res);
      const { data } = res;
      if (data.header.code === "0000") {
        setStickers(res.data.body.stickerList);
      }
    });
  };
  const debounceFetchSticker = useRef(
    debounce((nextValue) => fetchStickerSearched(nextValue), 1000)
  ).current;
  const onSearchSticker = (e) => {
    const q = e.value;
    setKeyword(q);
    setStickers(undefined);
    debounceFetchSticker(q);
  };
  return (
    <View style={styles.view}>
     <Searchbar
        placeholder="Search Sticker"
        placeholderTextColor='black'
        style={styles.textInput}
        value={keyword}
        onChangeText={(keyword) => onSearchSticker(keyword)}
      />
      <FlatList
        numColumns={5}
        style={{margin:4}}
        data={stickers}
        renderItem={({item}) => (
          <TouchableHighlight  onPress={() => sendSticker(item.stickerImg)}>
          <Image
            key={item.id}
            resizeMode='contain'
            style={styles.image}
            source={{uri: item.stickerImg}}
          />
          </TouchableHighlight>
        )}
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
  row: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 3,
    marginBottom: 5,
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
