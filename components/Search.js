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
  }

  _loadFilms() {
    if (this.searchedText.length > 0){
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchText(this.searchedText).then(data => {
        this.setState({ 
          films: data.results,
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

  render(){
    console.log(this.state.isLoading);
    
    return(
      <View style={styles.main_container}>
        <TextInput 
          placeholder="Titre du Film"
          style={[styles.textInput, { marginBottom: 15 }]} 
          onChangeText={(text) => {this._handelChange(text)}}
          onSubmitEditing={() => {this._loadFilms()}}
        />
        <Button 
          title="Rechercher"
          style={{height: 50}}
          onPress={() => {this._loadFilms()} } 
        />
        <FlatList
          data={this.state.films}
          keyExtractor= {(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} />}
        />
        {this._displayLoading()}
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20,
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