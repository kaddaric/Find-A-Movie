const API_TMDB = "31e20dad8a558b45adfa363f111d4d9c";

export function getFilmsFromApiWithSearchText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TMDB + '&language=fr&query=' + text;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error))
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name;
}