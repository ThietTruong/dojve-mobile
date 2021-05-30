import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end',
  },
  textIput: {
    flex: 1,
    marginHorizontal: 5,
    height: 30,
    padding: 2,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: '45%',
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  tabs: {
    height : '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tabTextStyle: {
    color: Colors.Grey,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
  },
  tabUnderline: {
    textDecorationLine: 'underline',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#F194FF"
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#00ad9b",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default styles;
