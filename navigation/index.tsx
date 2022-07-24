/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { ConnectorEvents, useWalletConnect, WalletConnectContext, WalletConnectLogo } from '@walletconnect/react-native-dapp';
import { Text, View } from '../components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ethers } from 'ethers'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const getAdress = async (address) => {
  await AsyncStorage.setItem("address", address)
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}

const setAdress = async(address) => {
  await AsyncStorage.setItem("address", address)
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();



function BottomTabNavigator() {

  const colorScheme = useColorScheme();

  const connector: undefined | any = useWalletConnect();

  const connectWallet = React.useCallback(() => {   

    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    
    return connector.killSession();
  }, [connector]);

  return (
    (connector.connected === false) ? <View style={styles.container}>
      <Text style={[{fontStyle:"normal", fontWeight:"bold", fontSize:30}]}>Login:</Text>
      <TouchableOpacity onPress={connectWallet} style={[ { borderRadius: 25 }, {backgroundColor:"blue"}, {padding:10}, {margin:10}]} >
        <Text style={[ {fontWeight:"bold"}, {color:"white"} ]}>Connect With WalletConnect</Text>
      </TouchableOpacity>
    </View> : 
      <WalletConnectContext.Provider value={connector}>
        <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}>
        <BottomTab.Screen
          name="TabOne"
          component={TabOneScreen}
          options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
            title: 'Inbox',
            tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
            headerLeft: () => (
              <Text>{`   ` + shortenAddress(connector.accounts[0])}</Text>
            ),
            headerRight: () => (
              <Pressable
                onPress={() =>
                
                  {!!connector.connected && (
                    killSession()
                  ) 
                }
              }
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                  {!!connector.connected && (
                    <Text style={styles.buttonTextStyle}>Logout</Text>
                  )}

                  {!connector.connected && (
                    <Text style={styles.buttonTextStyle}>Login</Text>
                  )}
              </Pressable>
            ),
          })}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoScreen}
          options={{
            title: 'Messages',
            tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </WalletConnectContext.Provider>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
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