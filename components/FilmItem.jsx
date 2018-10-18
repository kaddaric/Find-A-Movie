import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../TMDBApi.js/api_tmdb';
import { connect } from 'react-redux';

class FilmItem extends Component {

  _displayFavorite(){
    const { film, favoriteFilms } = this.props;
    let sourceImage = require('../images/ic_favorite.png')
    if(favoriteFilms.findIndex(item => item.id === film.id) !== -1){
      return <Image style={styles.favorite_image} source={sourceImage} />
    }
  }

  render(){
    const { film, displayDetailFilm } = this.props;
    return(
      <TouchableOpacity 
        onPress={() => displayDetailFilm(film.id)}
        style={styles.mainView}
      >
        <View>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
        </View>
        <View style={styles.contentView}>
          <View style={[styles.contentView, styles.headerView]}>
            {this._displayFavorite()}
            <Text style={styles.titleText}>{film.title}</Text>
            <Text style={styles.secondaryText}>{film.vote_average}</Text>
          </View>
          <View style={styles.dateView}>
            <Text>Date de sortie : {film.release_date}</Text>
          </View>
          <View style={[styles.contentView, styles.descriptionView]}>
            <Text numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
  },
  image:{
    width: 120,
    height: 180,
    marginTop: 10,
    backgroundColor: 'grey',
  },
  contentView: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 5,
  },
  headerView: {
    flexDirection: 'row',
  },
  dateView: {
    flex: 1,
  },
  titleText: {
    flex: 3,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryText:{
    flex: 1,
    fontWeight: 'bold',
  },
  favorite_image: {
    width: 15,
    height: 15,
    marginLeft: 10,
    marginRight: 10,
    alignContent: "center",
  }
});

const mapStateToProps = (state) => {
  return {
    favoriteFilms: state.favoriteFilms,
  }
}
export default connect(mapStateToProps)(FilmItem);