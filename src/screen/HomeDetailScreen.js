import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'


const HomeDetailscreen = props => {
    const {id} = props.route.params
    const book = useSelector(state => state.book.books.find(book => book._id === id))

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.txtHeaderContainer}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{book.bookTitle}</Text>
            </View>

            <View style={styles.imgContainer}>
                <Image source={{uri: book.ImgURL}} style={{width: '100%', height:'100%'}}/>
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.txtText}>Description</Text>
                <Text style={styles.txtField}>{book.bookDescription}</Text>
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.txtText}>Author</Text>
                <Text style={styles.txtField}>{book.bookAuthor}</Text>
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.txtText}>Year of Publication</Text>
                <Text style={styles.txtField}>{book.bookYear}</Text>
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.txtText}>Category</Text>
                <Text style={styles.txtField}>{book.bookTypes}</Text>
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.txtText}>Pages</Text>
                <Text style={styles.txtField}>{book.bookPages}</Text>
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.txtText}>Price</Text>
                <Text style={{marginBottom: 20, marginTop: 10, marginLeft:10, color: 'red'}}>$ {book.bookPrice}</Text>
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.txtText}>Rating</Text>
                <Text style={styles.txtField}>{book.bookRating}/5</Text>
            </View>
        </ScrollView>
    )
}

export default HomeDetailscreen

const styles = StyleSheet.create({
    txtHeaderContainer: {
        margin: 20
    },
    txtContainer: {
        marginHorizontal:20,
        marginTop: 20,
        marginBottom: 10,
        borderBottomColor:'#dddddd',
        borderBottomWidth: 2,
    },
    imgContainer: {
        height: 400
    },
    txtText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    txtField: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 15,
        marginBottom: 20
    }
})
