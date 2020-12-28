import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as bookAction from '../redux/actions/bookAction'
import { Formik } from 'formik'
import * as Yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'

const formSchema = Yup.object({
    bookTitle: Yup.string().required('*required').min(5, '*must be between 5 to 50 characters').max(50, '*must be between 5 to 50 characters'),
    ImgURL: Yup.string().required('*required'),
    bookDescription:  Yup.string().required('*required').min(30, '*must be at least 30 characters'),
    bookAuthor: Yup.string().required('*required'),
    bookPrice: Yup.number().required('*required'),
    bookTypes: Yup.string().required('*required'),
    bookYear: Yup.number().required('*required'),
    bookRating: Yup.number().required('*required'),
    bookPages: Yup.number().required('*required')
})

const AddBookScreen = props => {

    const {id} = props.route.params
    const book = useSelector(state => state.book.books.find(book => book._id === id))
    // console.log(id)
    // console.log(book)

    const [isLoading, setIsLoading] = useState(false)

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    const dispatch = useDispatch()

    return (
        <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={100}
                style={{flex: 1}}>
            <ScrollView>
                <Formik
                    initialValues={{
                        _id: book._id,
                        bookTitle: book.bookTitle,
                        ImgURL: book.ImgURL,
                        bookDescription: book.bookDescription,
                        bookAuthor: book.bookAuthor,
                        bookPrice: book.bookPrice.toString(),
                        bookTypes: book.bookTypes,
                        bookYear: book.bookYear.toString(),
                        bookRating: book.bookRating.toString(),
                        bookPages: book.bookPages.toString()
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        // console.log(values)
                        setIsLoading(true)
                        dispatch(bookAction.editBook(
                            values._id,
                            values.bookTitle,
                            values.ImgURL,
                            values.bookDescription,
                            values.bookAuthor,
                            values.bookPrice,
                            values.bookTypes,
                            values.bookYear,
                            values.bookRating,
                            values.bookPages))
                            .then(() => {
                                setIsLoading(false)
                                Alert.alert('book edited successfrully')
                            })
                            .then(() => {
                                dispatch(bookAction.fetchBooks())}
                                )
                            .then(() => props.navigation.navigate('Home'))
                            .catch(() => {
                                setIsLoading(false)
                                Alert.alert('an error occurred, please try again!')
                                props.navigation.navigate('Home')
                            })
                    }}>
                    {(props) => 
                    (
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Title</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookTitle')}
                                onBlur={props.handleBlur('bookTitle')}
                                value={props.values.bookTitle}
                            />
                            <Text style={styles.error}>{props.touched.bookTitle && props.errors.bookTitle}</Text>
                        </View>
                        
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Imgae URL</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('ImgURL')}
                                onBlur={props.handleBlur('ImgURL')}
                                value={props.values.ImgURL}
                            />
                            <Text style={styles.error}>{props.touched.ImgURL && props.errors.ImgURL}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Description</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookDescription')}
                                onBlur={props.handleBlur('bookDescription')}
                                value={props.values.bookDescription}
                            />
                            <Text style={styles.error}>{props.touched.bookDescription && props.errors.bookDescription}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Author</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookAuthor')}
                                onBlur={props.handleBlur('bookAuthor')}
                                value={props.values.bookAuthor}
                            />
                            <Text style={styles.error}>{props.touched.bookAuthor && props.errors.bookAuthor}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Price</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookPrice')}
                                onBlur={props.handleBlur('bookPrice')}
                                value={props.values.bookPrice}
                                keyboardType='numeric'
                            />
                            <Text style={styles.error}>{props.touched.bookPrice && props.errors.bookPrice}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Types</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookTypes')}
                                onBlur={props.handleBlur('bookTypes')}
                                value={props.values.bookTypes}
                            />
                            <Text style={styles.error}>{props.touched.bookTypes && props.errors.bookTypes}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Year</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookYear')}
                                onBlur={props.handleBlur('bookYear')}
                                value={props.values.bookYear}
                                keyboardType='numeric'
                            />
                            <Text style={styles.error}>{props.touched.bookYear && props.errors.bookYear}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Rating</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookRating')}
                                onBlur={props.handleBlur('bookRating')}
                                value={props.values.bookRating}
                                keyboardType='numeric'
                            />
                            <Text style={styles.error}>{props.touched.bookRating && props.errors.bookRating}</Text>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Book Pages</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={props.handleChange('bookPages')}
                                onBlur={props.handleBlur('bookPages')}
                                value={props.values.bookPages}
                                keyboardType='numeric'
                            />
                            <Text style={styles.error}>{props.touched.bookPages && props.errors.bookPages}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button title='save edit' onPress={props.handleSubmit} color='steelblue' />
                        </View>
                    </View>
                    )}

                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddBookScreen

const styles = StyleSheet.create({
    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
      },
      formGroup: {
        width: "100%",
      },
      label: {
        marginVertical: 10,
      },
      input: {
        paddingHorizontal: 2,
        paddingVertical: 8,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
      },
      buttonContainer: {
        marginTop: 20,
      },
      error: {
          color: 'red'
      },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
