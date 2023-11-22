import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({dropDownItem,setData}) => {

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => setData(value)}
        items={
          dropDownItem.map((item)=>{
            return {label: item, value: item};
          })
        }
      />
    </View>
  );
};

export default Dropdown;
