/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SliderCarousel from './src/SliderCarousel';

const entries = [
  {
    title: 'Item 1',
    image: 'https://picsum.photos/800/400?image=1',
    id: 1,
  },
  {
    title: 'Item 2',
    image: 'https://picsum.photos/800/400?image=2',
    id: 2,
  },
  {
    title: 'Item 3',
    image: 'https://picsum.photos/800/400?image=3',
    id: 3,
  },
  {
    title: 'Item 4',
    image: 'https://picsum.photos/800/400?image=4',
    id: 4,
  },
  {
    title: 'Item 5',
    image: 'https://picsum.photos/800/400?image=5',
    id: 5,
  },
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <SliderCarousel entries={entries} onCurrentItem={console.log} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
