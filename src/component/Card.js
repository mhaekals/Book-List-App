import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as bookAction from '../redux/actions/bookAction'

const Card = props => {

    const dispatch = useDispatch()
    const isFav = useSelector(state => state.book.favorites.some(book => book._id === props._id))

    return (
        <TouchableOpacity onPress= {() => props.navigation.navigate('Detail', {id: props._id})}>
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image style={styles.img} source={{uri: props.ImgURL}} />
                </View>

                <View style={styles.containerTxt}>
                    <Text numberOfLines={1} style={{fontSize: 20, fontWeight: 'bold'}}>{props.bookTitle}</Text>
                    <Text>by {props.bookAuthor}</Text>
                    <Text>{props.bookYear}</Text>
                    <Text style={{color: 'red'}}>${props.bookPrice}</Text>
                    <Text style={{marginBottom: 10}}>rating {props.bookRating}/5</Text>
                    <Button 
                        title={isFav? 'remove from favorite' :'add to favorite'}
                        color={isFav? 'red' : 'steelblue'}
                        onPress={() => {
                            dispatch(bookAction.addToFav(props._id))
                        }} />
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        backgroundColor: '#ffffff',
        elevation: 5,
        height: 190, 
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    containerImg: {
        height: 150,
        width: 100,
        margin: 10,
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 5
    },
    containerTxt: {
        margin: 10,
        width: '63%'
    }
})
