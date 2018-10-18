const initialState = { favoriteFilms: [] }

export function toggleFavorite(state = initialState, action){
  let newState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteFilmIndex = state.favoriteFilms.findIndex(item => item.id === action.value.id);
      if(favoriteFilmIndex !== -1){
        //  Le film est présent dans les favoris, on le supprime
        newState = {
          ...state,
          favoriteFilms: state.favoriteFilms.filter((item, index) => index !== favoriteFilmIndex)
        }
      } else {
        // Le film n'est pas présent dans les favoris, on l'ajoute
        newState = {
          ...state,
          favoriteFilms: [...state.favoriteFilms, action.value]
        }
      }
      // si newState est undefined on retourne state
      return newState || state; 
  
    default:
      return state
  }
}