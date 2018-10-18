import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchText } from '../TMDBApi.js/api_tmdb';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      films: [],
      isLoading: false,
    }
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      films: [],
    });
    this._loadFilms();
  }

  _loadFilms() {
    if (this.searchedText.length > 0){
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchText(this.searchedText, this.page+1).then(data => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({ 
          films: [...this.state.films, ...data.results],
          isLoading: false,
        });
      });
    }
  }

  _handelChange(text) {
    this.searchedText = text;
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

  _displayDetailFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm });    
  }

  render(){ 
       
    return(
      <View style={styles.main_container}>
        <TextInput 
          placeholder="Titre du Film"
          style={[styles.textInput, { marginBottom: 15 }]} 
          onChangeText={(text) => {this._handelChange(text)}}
          onSubmitEditing={() => {this._searchFilms()}}
        />
        <Button 
          title="Rechercher"
          style={{height: 50}}
          onPress={() => {this._searchFilms()} } 
        />
        <FlatList
          data={this.state.films}
          keyExtractor= {(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} displayDetailFilm={this._displayDetailFilm} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages){
              this._loadFilms();
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textInput: {
    marginLeft: 20, 
    marginRight: 20, 
    height: 50, 
    paddingLeft: 10
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Search;
