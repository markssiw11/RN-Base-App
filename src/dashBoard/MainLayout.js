import React from 'react';
import {Animated, TouchableOpacity, StyleSheet} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {Box, SIZE, Text, theme} from '../component';
import {bottom_tabs} from '../utils/constant';
export function MainLayout() {
  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const renderItem = ({item, index}) => {
    const {label} = item;
    let children = <Home />;
    switch (label) {
      case LABEL_CONSTANT.HOME:
        children = <Home />;
        break;
      case LABEL_CONSTANT.SEARCH:
        children = <Search />;
        break;
      case LABEL_CONSTANT.PROFILE:
        children = <Profile />;
        break;
      default:
        break;
    }
    return (
      <Box height={SIZE.height} width={SIZE.width} alignSelf="center" justifyContent="center" alignItems="center">
        {children}
      </Box>
    );
  };
  const onBottomTabPress = React.useCallback(bottomIndex => {
    flatListRef?.current?.scrollToOffset({
      offset: bottomIndex * SIZE.width,
    });
  });
  return (
    <Box flex={1}>
      <Animated.FlatList
        data={DATA}
        horizontal
        ref={flatListRef}
        scrollEnabled={false}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `MainLayoutKey -${item.id}`}
        pagingEnabled={true}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
      />
      {renderBottomTab(scrollX, onBottomTabPress)}
    </Box>
  );
}
const LABEL_CONSTANT = {
  HOME: 'home',
  SEARCH: 'Search',
  PROFILE: 'Profile',
};
const DATA = [
  {
    label: 'Home',
    id: 1,
  },
  {
    label: 'Search',
    id: 2,
  },
  {
    label: 'Profile',
    id: 3,
  },
];

function Home() {
  return (
    <Box>
      <Text>home...</Text>
    </Box>
  );
}
function Search() {
  return (
    <Box>
      <Text>Search...</Text>
    </Box>
  );
}
function Profile() {
  return (
    <Box>
      <Text>Profile...</Text>
    </Box>
  );
}

function renderBottomTab(scrollX, onBottomTabPress) {
  return (
    <Box marginBottom="l" height={85} marginHorizontal="m" borderRadius="m" backgroundColor="secondary">
      <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress} />
    </Box>
  );
}

const Tabs = ({scrollX, onBottomTabPress}) => {
  const containerRef = React.useRef();
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const bottom_tabs_ref = bottom_tabs.map(e => ({
    ...e,
    ref: React.useRef(),
  }));
  React.useEffect(() => {
    let ml = [];
    bottom_tabs_ref.forEach(bottom_tab => {
      bottom_tab?.ref?.current?.measureLayout(containerRef.current, (x, y, width, height) => {
        ml.push({
          x,
          y,
          height,
          width,
        });
        if (ml.length === bottom_tabs_ref.length) {
          setMeasureLayout(ml);
        }
      });
    });
  }, [containerRef.current]);
  const TabIndicator = ({measureLayout, scrollX}) => {
    const inputRange = bottom_tabs_ref.map((_, i) => i * SIZE.width);
    const tabIndicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map(measure => measure.width),
    });
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map(measure => measure.x),
    });
    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          height: '100%',
          width: tabIndicatorWidth,
          borderRadius: theme.borderRadii.m,
          backgroundColor: theme.colors.danger,
          transform: [
            {
              translateX,
            },
          ],
        }}
      />
    );
  };
  return (
    <Box flex={1} flexDirection="row" ref={containerRef}>
      {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}
      {bottom_tabs_ref.map((item, index) => {
        return (
          <TouchableOpacity onPress={() => onBottomTabPress(index)} style={styles.tabItem} key={`Bottom_tabs-${item.id}`} ref={item.ref}>
            <FontIcon name={item.icon} color={theme.colors.white} size={20} />
            <Box height={5} />
            <Text color="white">{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
