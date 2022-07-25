import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, {useState, useEffect, useCallback} from 'react';

import { View } from "./components/Themed";

import { Text } from "react-native";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as SplashScreen from "expo-splash-screen";

import { JetBrainsMono_400Regular, JetBrainsMono_400Regular_Italic, JetBrainsMono_700Bold,  JetBrainsMono_700Bold_Italic } from '@expo-google-fonts/jetbrains-mono';
import * as Font from "expo-font";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ "regular":JetBrainsMono_400Regular, "italic":JetBrainsMono_400Regular_Italic,  "bold":JetBrainsMono_700Bold, "boldItalic":JetBrainsMono_700Bold_Italic });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <>
        <View
        onLayout={onLayoutRootView}>
        </View>
        <Navigation colorScheme={colorScheme} />
      </>
      <StatusBar />
    </SafeAreaProvider>
  );
}