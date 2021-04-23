import React, { useEffect, useRef, useState } from "react";
import {Searchbar} from 'react-native-paper';
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import axios from "../../utility/axios";
import {ScrollView ,Button, TextInput, StyleSheet, KeyboardAvoidingView,View,FlatList,Image, Modal,Tooltip} from 'react-native';
import {SkeletonPlaceholder} from "react-native-skeleton-placeholder";

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
    sendAMessage(1, linkSticker);
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
        placeholder="Search Giphy"
        placeholderTextColor='black'
        style={styles.textInput}
        value={keyword}
        onChangeText={(keyword) => onSearchSticker(keyword)}
      />
      <FlatList
        numColumns={5}
        data={stickers}
        renderItem={({item}) => (
          <Image
            resizeMode='contain'
            style={styles.image}
            source={{uri: item.stickerImg}}
          />
        )}
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
    flexDirection: 'column'
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