import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import Card from '../component/Card'
import { useDispatch, useSelector } from 'react-redux'
import * as bookAction from '../redux/actions/bookAction'
import {FloatingAction} from 'react-native-floating-action'
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/MaterialIcons'

const HomeScreen = props => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const {books} = useSelector(state => state.book)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(bookAction.fetchBooks())
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    }, [dispatch])

    const onRefreshHandle = () => {
        setRefresh(true)
        dispatch(bookAction.fetchBooks()).then(() => setRefresh(false)).catch(() => setRefresh(false))
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if(books.length === 0 && !isLoading){
        return (
            <View style={styles.centered}>
                <Text>No books found. You could add one!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
                <SwipeListView
                    keyExtractor={item => item._id}
                    useFlatList={true}
                    data={books}
                    disableLeftSwipe={true}
                    refreshing={refresh}
                    onRefresh={() => onRefreshHandle()}
                    // extraData={books}
                    renderItem={ ({item}) => (
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
                    renderHiddenItem={ (rowData, rowMap) => (
                        <View style={styles.hiddenRow}>
                            <TouchableOpacity style={{backgroundColor:'red', height:'100%', width:75, alignItems:'center', justifyContent:'center'}}
                            onPress={ () => dispatch(bookAction.removeBook(rowData.item._id))
                                            .then(() => Alert.alert('book deleted successfully'))
                                            .then(() => setTimeout(() => dispatch(bookAction.fetchBooks()), 2000))
                                            .catch(() => Alert.alert('an error occured'))}>
                                <Icon name='clear' color='white' size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: 'steelblue', height:'100%', width:75, alignItems:'center', justifyContent:'center'}}
                            onPress={() => props.navigation.navigate('EditBook', {id: rowData.item._id})}>
                                <Icon name='edit' color='white' size={20} />
                            </TouchableOpacity>
                        </View>
                    )}
                    leftOpenValue={150}
                    onRowOpen={(rowKey, rowMap) => {
                            
                        }}
                />
                <FloatingAction
                    position='right'
                    animated={false}
                    showBackground={false}
                    color='red'
                    onPressMain={() => props.navigation.navigate('AddBook')}
                />
        </View>
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hiddenRow: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    }
})


{/* <FlatList
data={books}
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
)}/> */}
