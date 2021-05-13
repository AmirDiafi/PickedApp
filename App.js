/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Modal,
  Alert,
} from 'react-native'
const add_image = require('./assets/add.png')
const camera_image = require('./assets/camera.png')
import ImagePicker from 'react-native-image-crop-picker'
class App extends React.Component {
  state = {
    modalVisible: false,
    response: undefined,
  }

  handleImage = type => {
    if (type === 'openCamera') {
      ImagePicker.openCamera({
        width: 104,
        height: 104,
        cropping: true,
      }).then(response => {
        console.log('Response = ', response)
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          this.setState({response, modalVisible: false})
        }
      })
    } else if (type === 'openPicker') {
      ImagePicker.openPicker({
        width: 104,
        height: 104,
        cropping: true,
      })
        .then(response => {
          console.log('Response = ', response)
          if (response.didCancel) {
            console.log('User cancelled image picker')
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error)
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton)
          } else {
            this.setState({response, modalVisible: false})
          }
        })
        .catch(err => Alert.alert('OPPS', 'Please choose or add a photo'))
    }
  }

  handlePublish = () => {
    const baseUri = 'your-server-uri-here'
    const {response} = this.state
    if (response) {
      const formData = new FormData()
      formData.append('image', {
        uri: response?.path,
        type: file?.mime, // or photo.type
        name: 'PickedApp-' + Date.now(),
      })
      const requestOptions = {
        method: 'POST',
        body: formData,
      }
      fetch(baseUri, requestOptions)
        .then(res => res.json())
        .then(res => {
          Alert.alert('image uploaded successfully')
          console.log(res)
        })
    } else {
      Alert.alert('please add an image to upload')
    }
  }

  render() {
    const {modalVisible, response} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            this.setState({modalVisible: !modalVisible})
          }}>
          <SafeAreaView style={styles.modalContainer}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.handleImage('openPicker')
                  console.log('upload from gallery')
                }}>
                <View style={styles.addButtonModal}>
                  <Image source={add_image} />
                  <Text style={styles.uploadedImage} style={styles.buttonTitle}>
                    Upload Image
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.handleImage('openCamera')
                  console.log('open camera')
                }}>
                <View style={styles.addButtonModal}>
                  <Image source={camera_image} />
                  <Text style={styles.buttonTitle}>Open Camera</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                onPress={() => this.setState({modalVisible: !modalVisible})}>
                <View style={styles.cancelButtonModal}>
                  <Text style={styles.cancelButtonTitle}>Cancel</Text>
                </View>
              </TouchableHighlight>
            </View>
          </SafeAreaView>
        </Modal>
        <Text style={styles.title}>Pick your image</Text>
        <View>
          <TouchableHighlight
            onPress={() => this.setState({modalVisible: !modalVisible})}>
            <View style={styles.addButton}>
              {response ? (
                <Image
                  style={styles.uploadedImage}
                  source={{uri: response.path}}
                />
              ) : null}
              <Image style={styles.addImage} source={add_image} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handlePublish}>
            <View style={styles.publishButton}>
              <Text style={styles.buttonTitle}>Upload</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 20,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    width: 104,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#999',
    borderStyle: 'dashed',
    borderRadius: 18,
    overflow: 'hidden',
  },
  modalContainer: {
    justifyContent: 'center',
    backgroundColor: '#EEE',
    flex: 1,
  },
  addButtonModal: {
    backgroundColor: '#0586F0',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 18,
    margin: 10,
    flexDirection: 'row',
    height: 50,
  },
  buttonTitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'right',
  },
  cancelButtonModal: {
    borderColor: '#0586F0',
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 18,
    margin: 10,
    flexDirection: 'row',
    height: 50,
  },
  cancelButtonTitle: {
    fontSize: 18,
    color: '#0586F0',
    textAlign: 'right',
  },
  uploadedImage: {
    width: 104,
    height: 104,
  },
  addImage: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    zIndex: 2,
  },
  publishButton: {
    padding: 10,
    backgroundColor: '#0586F0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
})
