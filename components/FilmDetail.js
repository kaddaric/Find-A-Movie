import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
import { getFilmDetailFromApi, getImageFromApi } from '../TMDBApi/api_tmdb';
import { connect } from 'react-redux';

class FilmDetail extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      film: undefined,
      isLoading: true,
    }
  }

  componentDidMount(){    
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => 
      this.setState({
        film: data,
        isLoading: false,
      })
    )
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite(){    
    const action = {
      type: "TOGGLE_FAVORITE",
      value: this.state.film,
    };
    this.props.dispatch(action);
  }

  _displayFavoriteImage() {
    let sourceImage = require('../images/ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  _displayFilm(){
    if(this.state.film != undefined) {
      const film = this.state.film;
      return(
        <ScrollView style={styles.scrollview_container}>
          <Image 
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}} 
          />
          <Text style={styles.title}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>          
          <View style={styles.description}>
            <Text style={styles.overview}>{film.overview}</Text>
            <Text>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>          
            <Text>Note : {film.vote_average}</Text>
            <Text>Nombre de votes : {film.vote_count}</Text>
            <Text>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
            <Text>Genre(s) : {film.genres.map(genre => genre.name).join(' / ')} </Text>
          </View>
        </ScrollView>
      )
    }
  }

  render() {        
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
  },
  image:{
    flex: 1,
    height: 200,
  },
  title: {
    flex: 1,
    fontSize: 50,
    textAlign: "center",
  },
  overview: {
    fontStyle: 'italic',
    paddingBottom: 10,
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  favorite_container: {
    alignItems: "center",
  },
  favorite_image: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
})

const mapStateToProps = (state) => {
  return {
      favoritesFilm: state.favoritesFilm,
    }
}

export default connect(mapStateToProps)(FilmDetail);