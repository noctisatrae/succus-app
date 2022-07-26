import "@ethersproject/shims";
import { ethers } from 'ethers'

import { useState, useEffect } from "react";

import { MonoText } from "./StyledText";

const url = "https://mainnet.infura.io/v3/ac1f868a6b534b8ca80c988ed5617fb8"
const mainnetInfura = new ethers.providers.StaticJsonRpcProvider(url);

const ensLookup = async (addr) => {
  return await mainnetInfura.lookupAddress(addr);
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

export default function Address({ address, weight="regular", size=12 }) {
  const [ensAddr, setEnsAddr]: any = useState()

  useEffect(() => {
    ensLookup(address).then(data => setEnsAddr(data) )
  }, [])

  return (
      <MonoText style={[ {paddingLeft:5}, {fontSize: ((ensAddr == null) ? 15 : size ) } ]}>{(ensAddr == null) ? shortenAddress(address) : ensAddr}</MonoText>
  )
}