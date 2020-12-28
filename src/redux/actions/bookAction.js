export const FETCH_BOOKS = 'FETCH_BOOKS'
export const ADD_BOOKS = 'ADD_BOOKS'
export const ADDED_TO_FAV = 'ADDED_TO_FAV'
export const REMOVE_BOOKS = 'REMOVE_BOOKS'
export const EDIT_BOOKS = 'EDIT_BOOKS'

const URL = 'https://still-sands-63878.herokuapp.com'

export const fetchBooks = () => {
    return async dispatch => {
        const result = await fetch(`${URL}/api/books`)
        const resultBook = await result.json()

        dispatch({
            type: FETCH_BOOKS,
            payload: resultBook
        }) 
    }
}

export const addBooks = ({bookTitle, ImgURL, bookDescription, bookAuthor, bookPrice, bookTypes, bookYear, bookRating, bookPages}) => {
    return async dispatch => {
        const response = await fetch(`${URL}/api/books`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({bookTitle, ImgURL, bookDescription, bookAuthor, bookPrice, bookTypes, bookYear, bookRating, bookPages})
        })

        const responseData = await response.json()

        dispatch({
            type: ADD_BOOKS,
            payload: responseData
        })
    }
}

export const addToFav = _id => {
    return {
        type: ADDED_TO_FAV,
        payload: _id
    }
}

export const removeBook = id => {
    return async dispatch => {
        const response = await fetch(`${URL}/api/books/${id}`, {
            method: 'DELETE',
            body: JSON.stringify(id)
        })
        
        const responseData = await response.json()

        dispatch({
            type: REMOVE_BOOKS,
            payload: responseData
        })
    }
}

export const editBook = (id, bookTitle, ImgURL, bookDescription, bookAuthor, bookPrice, bookTypes, bookYear, bookRating, bookPages) => {
    return async dispatch => {
        const response = await fetch(`${URL}/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ id, bookTitle, ImgURL, bookDescription, bookAuthor, bookPrice, bookTypes, bookYear, bookRating, bookPages})
        })
        console.log(response)
        const responseData = await response.json()
        

        dispatch({
            type: EDIT_BOOKS,
            payload: responseData
        })
    }
}
