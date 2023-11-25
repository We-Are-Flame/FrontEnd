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
        placeholder={{
          label: "카테고리를 선택해주세요.",
        }}
      />
    </View>
  );
};

export default Dropdown;
