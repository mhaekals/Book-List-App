import { FETCH_BOOKS, ADD_BOOKS, ADDED_TO_FAV, REMOVE_BOOKS, EDIT_BOOKS } from '../actions/bookAction'

const intialState = {
    books: [],
    favorites: []
}

export default function(state = intialState, action) {

    switch(action.type) {
        case FETCH_BOOKS:
            return {
                ...state,
                books: action.payload.data
            }
        case ADD_BOOKS:
            // console.log(action.payload)
          return {
              ...state,
              books: state.books.concat(action.payload.data)
          }
        case ADDED_TO_FAV:
            // add or remove item from favorites
            const index = state.favorites.findIndex(book => book._id === action.payload)
            if (index >= 0){
                // item exist in favorites
                const favorites = [...state.favorites]
                favorites.splice(index, 1)
                return {
                    ...state,
                    favorites: favorites
                }  
            } else {
                // item not exist in favorites
                const book = state.books.find(book => book._id === action.payload)
                console.log(book)
                return {
                    ...state,
                    favorites: state.favorites.concat(book)
                }
            }
        case REMOVE_BOOKS:
            return {
                ...state,
                books: action.payload.data
            }
        case EDIT_BOOKS:
            return {
                ...state,
                books: [...state.books]
                // books: state.books.map(book => action.payload.find(item => item.id === book._id) || book)
                //arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);   
            }
    }

    return state;
}