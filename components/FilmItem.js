import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { getImageFromApi } from '../TMDBApi.js/api_tmdb';

class FilmItem extends Component {

  render(){
    const film = this.props.film
    return(
      <View style={styles.mainView}>
        <View>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
        </View>
        <View style={styles.contentView}>
          <View style={[styles.contentView, styles.headerView]}>
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
      </View>
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
  descriptionView: {

  }
});

export default FilmItem;