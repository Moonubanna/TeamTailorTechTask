import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const uploadFile = async (bodyObj, updatePercentage) => {
  try {
    let name = bodyObj.name.split('.');
    await RNFetchBlob.config({
      trusty: true,
    })
      .fetch(
        'POST',
        'https://ipfs-dev.ternoa.dev/api/v0/add',
        {
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: name[0],
            filename: bodyObj.name,
            type: bodyObj.mime,
            data:
              Platform.OS === 'android'
                ? RNFetchBlob.wrap(bodyObj.uri)
                : bodyObj.uri,
          },
        ],
      )
      .uploadProgress({interval: 10}, (written, total) => {
        console.log(
          'uploaded',
          written,
          total,
          Math.round((written / total) * 100) + '%',
        );
        updatePercentage(Math.round((written / total) * 100));
        console.warn('written', written, '__', total);
      })
      .then(response => response.json())
      .then(RetrivedData => {
        updatePercentage(100);
        console.log(RetrivedData);
        alert('uploaded successfully');
      })
      .catch(err => {
        console.log('Error', err);
        alert('Something went wrong!')
      });
  } catch (error) {
    console.log('ErrorA', error.message);
  }
};

export default uploadFile;
