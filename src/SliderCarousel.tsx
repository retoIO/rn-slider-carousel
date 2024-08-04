import React, {PropsWithChildren, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
} from 'react-native';

type Entry = {
  image: string;
  title: string;
  id: number;
};

type SliderCarouselProps = PropsWithChildren<{
  entries: Entry[];
  onCurrentItem?: (id: number) => void;
  currentItem?: number;
}>;

const {width: viewportWidth} = Dimensions.get('window');
const ITEM_WIDTH = viewportWidth / 3;
const CENTER_OFFSET = (viewportWidth - ITEM_WIDTH) / 2;

const SliderCarousel = ({
  entries,
  onCurrentItem,
  currentItem,
}: SliderCarouselProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (currentItem !== undefined) {
      const index = entries.findIndex(entry => entry.id === currentItem);
      if (index !== -1) {
        scrollViewRef.current?.scrollTo({
          x: index * ITEM_WIDTH,
          animated: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / ITEM_WIDTH);

    if (onCurrentItem) {
      onCurrentItem(entries[index].id);
    }
  };

  const renderItem = (item: Entry, index: number) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.slide,
          {
            transform: [{scale}],
            opacity,
          },
        ]}
        key={index}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
        contentOffset={{x: ITEM_WIDTH, y: 0}}
        contentContainerStyle={{paddingHorizontal: CENTER_OFFSET}}>
        {entries.map((item, index) => renderItem(item, index))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SliderCarousel;
