import React, { Component } from 'react';
import { View } from 'react-native';
import FilmList from './FilmList';
import { connect } from 'react-redux';


class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <View style={{ flex: 1 }}>
        <FilmList 
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm,
  }
}

export default connect(mapStateToProps)(Favorites);