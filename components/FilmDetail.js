import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class FilmDetail extends Component {
  
  render() { 
    return (
      <View style={styles.mainContainer}>
        <Text>Detail du film : {this.props.navigation.state.params.overview}</Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  }
})
export default FilmDetail;