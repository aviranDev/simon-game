import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
const Loader = ({visible = false}) => {
  const {height, width} = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, {height, width}]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#5fdffdff" />
          <Text style={styles.loading}>Simon Loading...</Text>
        </View>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: 70,
    backgroundColor: '#ffffff',
    marginHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  loading: {
    marginRight: 10,
    fontSize: 17,
    color: '#000',
  },
});
