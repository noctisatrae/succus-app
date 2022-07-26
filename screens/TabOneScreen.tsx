import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { StyledButton, MonoText } from '../components/StyledText';

import AsyncStorage from '@react-native-async-storage/async-storage';

// const gun = Gun({ peers:['https://gun-manhattan.herokuapp.com/gun', 'https://gun-us.herokuapp.com/gun', "https://gunpoint.herokuapp.com/gun"],localStorage:false, radisk:true}).get("succus-soccor").get("dev");

import Address from '../components/Address';

// import Gun from "gun";
// import 'gun/lib/radix'
// import 'gun/lib/radisk'
// import 'gun/lib/rindexed'
import { WalletConnectContext } from '@walletconnect/react-native-dapp';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const wallet = useContext(WalletConnectContext);

  return (
    <View style={styles.container}></View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
