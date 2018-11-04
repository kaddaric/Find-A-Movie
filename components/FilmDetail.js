import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform } from 'react-native';
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
    this._shareFilm = this._shareFilm.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
    if (params.film != undefined && Platform.OS === 'ios') {
      return {
          // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
          headerRight: <TouchableOpacity
                          style={styles.share_touchable_headerrightbutton}
                          onPress={() => params.shareFilm()}>
                          <Image
                            style={styles.share_image}
                            source={require('../images/ic_share.png')} />
                        </TouchableOpacity>
      }
    }
  }

  componentDidMount(){
    // Dès que le film est chargé, on met à jour les paramètres de la navigation (avec la fonction _updateNavigationParams) pour afficher le bouton de partage
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) { 
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      }, () => { this._updateNavigationParams() })
      return
    }  
    this.setState({
      isLoading: true,
    })
 
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => 
      this.setState({
        film: data,
        isLoading: false,
      }), () => {this._updateNavigationParams}
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

  // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
      .then(
        Alert.alert(
          'Succès',
          'Film partagé',
          [
            {text: 'OK', onPress: () => {}},
          ]
        )
      )
      .catch(err =>
        Alert.alert(
          'Echec',
          'Film non partagé',
          [
            {text: 'OK', onPress: () => {}},
          ]
        )
      )
  }

  _displayFloatingActionButton() {
    const { film } = this.state
    if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../images/ic_share.png')} />
        </TouchableOpacity>
      )
    }
  }

  render() {        
    return (
      <SafeAreaView style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
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