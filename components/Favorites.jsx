import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <View style={styles.main_container}>
        <Text>My favorites</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
});

export default Favorites;