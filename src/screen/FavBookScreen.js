import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import Card from '../component/Card'

const FavBookScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const favorites = useSelector(state => state.book.favorites)

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if(favorites.length === 0 && !isLoading){
        return (
            <View style={styles.centered}>
                <Text>No books found in favorites!</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={favorites}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
                <Card
                    _id={item._id}
                    navigation={props.navigation}
                    ImgURL={item.ImgURL}
                    bookTitle={item.bookTitle}
                    bookAuthor={item.bookAuthor}
                    bookYear={item.bookYear}
                    bookPrice={item.bookPrice}
                    bookRating={item.bookRating}
                />
            )}
        />
    )
}

export default FavBookScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
