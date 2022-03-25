import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const PercentageBar = ({
  navigation,
  percentage,
  height,
  backgroundColor,
  completedColor,
}) => {
  return (
    <View>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{
            width: '100%',
            height: height,
            marginVertical: 10,
            backgroundColor: backgroundColor,
          }}
        />
        <View
          style={{
            width: percentage ? percentage : 0,
            height: height,
            marginVertical: 10,
            backgroundColor: completedColor,
            position: 'absolute',
            bottom: 20,
          }}
        />
        <View
          style={{
            width: percentage ? percentage : 0,
            height: height,
            bottom: 10,
          }}>
          <Text style={{textAlign: 'right'}}>{percentage}</Text>
        </View>
      </View>
    </View>
  );
};

export default PercentageBar;
