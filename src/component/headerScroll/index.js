import React, { useRef } from 'react';
import { Dimensions, Animated } from 'react-native';

import { Box, Text } from '../../component';
const HEADER_HEIGHT = Dimensions.get('screen').width;
function Root() {
  const scrollA = useRef(new Animated.Value(0)).current;
  const RenderHeader = () => {
    return (
      <Box style={styles.bannerContainer} >
        <Animated.Image
          resizeMode="center"
          style={styles.banner(scrollA)}
          source={require('../../assets/images/food.jpg')}
        />
      </Box>

    )
  }
  const styles = {
    bannerContainer: {
      marginTop: -1000,
      paddingTop: 1000,
      alignItems: 'center',
      overflow: 'hidden',
    },
    banner: scrollA => ({
      height: HEADER_HEIGHT,
      width: '200%',
      transform: [
        {
          translateY: scrollA.interpolate({
            inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
            outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75, HEADER_HEIGHT * 0.75],
          }),
        },
        {
          scale: scrollA.interpolate({
            inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT, HEADER_HEIGHT + 1],
            outputRange: [2, 1, 0.8, 0.5],
          }),
        },
      ],
    }),
  };
  return (
    <Box flex={1} backgroundColor="background"  >
      <Animated.FlatList
        ListHeaderComponent={<RenderHeader />}
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true },
        )}
        keyExtractor={(_, index) => `${index}`}
        renderItem={renderItem}
        scrollEventThrottle={16}
      />
    </Box>
  )

}

const renderItem = ({ item, index }) => {
  return (
    <Box backgroundColor="lightBlue" borderRadius="s" marginVertical="m" marginHorizontal="m" >
      <Text padding="m" variant="title3"  >{item}</Text>
    </Box>
  )
}

const DATA = [
  'parmesan cheese', 'eggs', 'fresh shrimps', 'potato', 'chilli sauce', 'tomato ketchup', 'onion',
  'fresh shrimps', 'potato', 'chilli sauce', 'tomato ketchup', 'onion'
]
export default Root;