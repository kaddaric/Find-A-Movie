import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
import { getFilmDetailFromApi, getImageFromApi } from '../TMDBApi.js/api_tmdb';

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
})
export default FilmDetail;