# Getting Started

```
npm install @juanpablocs/rn-slider-carousel
```
## Step 1: Implement slider

```tsx
import React from 'react';
import SliderCarousel from '@juanpablocs/rn-slider-carousel';

function App(): React.JSX.Element {
  const markers = [
  {
    lat: -12.1207698,
    lng: -77.0304079,
    title: 'KFC Miraflores',
    id: '1',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipMgTanJHISBSaD6fxt7qbBUFdPyumYn_IV8_acR=s1360-w1360-h1020',
  },
  // ...
  ];
  return (
    <View>
      <SliderCarousel entries={entries} onCurrentItem={console.log} />
    </View>
  )
}
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:
