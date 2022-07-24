import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Gun from "gun";
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/rindexed'
import { WalletConnectContext } from '@walletconnect/react-native-dapp';

import "@ethersproject/shims";
import { ethers } from 'ethers'

const url = "https://mainnet.infura.io/v3/ac1f868a6b534b8ca80c988ed5617fb8"
const mainnetInfura = new ethers.providers.StaticJsonRpcProvider(url);

const gun = Gun({ peers:['https://gun-manhattan.herokuapp.com/gun', 'https://gun-us.herokuapp.com/gun', "https://gunpoint.herokuapp.com/gun"],localStorage:false, radisk:true}).get("succus-soccor").get("dev");

const ensLookup = async (addr) => {
  return await mainnetInfura.lookupAddress(addr);
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const wallet = useContext(WalletConnectContext);
  const [ensAddr, setEnsAddr]: any = useState()

  useEffect(() => {
    ensLookup(wallet.session.accounts[0]).then(data => setEnsAddr(data) )
  }, [])

  return (
    <Text>{(ensAddr == null) ? shortenAddress(wallet.session.accounts[0]) : ensAddr}</Text>
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
