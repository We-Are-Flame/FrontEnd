import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

//<Dropdown dropDownItem={sort} setData={setSelectedSort} label="정렬 선택" widthProps={150}/>
const Dropdown = ({dropDownItem,setData,label,widthProps}) => {

  return (
    <View style={(widthProps) ? {width:widthProps} : {}}>
      <RNPickerSelect
        onValueChange={(value) => setData(value)}
        items={
          dropDownItem.map((item,index)=>{
            return {label: item, value: item, key: index.toString()};
          })
        }
        placeholder={{
          label: label,
        }}
      />
    </View>
  );
};

export default Dropdown;
