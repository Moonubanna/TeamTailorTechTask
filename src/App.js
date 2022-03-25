/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from 'react-native';

//library
import ImagePicker from 'react-native-image-crop-picker';
import Orientation from 'react-native-orientation';

// components
import uploadFile from './uploadFile';
import PercentageBar from './PercentageBar';
const WIDTH = Dimensions.get('window').width;
const App = () => {
  const [percentage, setPercentage] = useState(0);
  const [fileName, setFileName] = useState('selected file name');
  const [filePath, setFilePath] = useState('selected file path');
  const [fileSize, setFileSize] = useState('selected file size');
  const [imageObj, setImageObj] = useState(null);

  // Component did mount
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  useEffect(() => {
    console.warn('percentage', percentage);
  }, [percentage]);
  // function pic file from gallery
  const pressSelectFile = () => {
    let tempImageObject = null;
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'any',
      multiple: false,
    }).then(image => {
      if (image.path) {
        let parts = image.path.split('/');
        let loc = parts.pop();
        tempImageObject = {
          uri: image.path,
          type: image.mime,
          name: loc,
        };
        console.warn('image_', image);
        setFileName(loc);
        setFilePath(image.path);
        setFileSize(bytesToSize(image.size));
        setImageObj(tempImageObject);
      }
    });
  };
  const bytesToSize = bytes => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  const handleFile = async imageObj => {
    try {
      await uploadFile(imageObj, updatePercentage);
    } catch (err) {
      setPercentage(0);
      console.log(err);
    }
  };

  const updatePercentage = percentage => {
    setPercentage(percentage);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={'white'} />
      <View style={styles.container}>
        <Text style={styles.txt}>{fileName}</Text>
        <Text style={styles.txt}>{filePath}</Text>
        <Text style={styles.txt}>{fileSize}</Text>

        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={() => {
            pressSelectFile();
          }}>
          <Text style={styles.buttonTxt}>{'Select File'}</Text>
        </Pressable>
        <View style={{width: 100, justifyContent: 'center'}}>
          <PercentageBar
            height={20}
            backgroundColor={'grey'}
            completedColor={'green'}
            percentage={percentage}
          />
        </View>
        <Pressable
          style={({pressed}) => [
            styles.button,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
          onPress={() => {
            if (imageObj !== null) handleFile(imageObj);
          }}>
          <Text style={styles.buttonTxt}>{'Upload Select File'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  txt: {
    color: 'black',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: 'purple',
    borderWidth: 1,
  },
  buttonTxt: {
    fontSize: 14,
    color: 'purple',
  },
});

export default App;
