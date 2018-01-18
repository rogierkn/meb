import React from "react";
import {View} from "react-native";
import {colors} from "../styles";

const ColorContainer = ({children}) => {

    return <View style={{height: '100%'}}>
        <View style={{height: '40%', backgroundColor: colors.colorContainer}}/>
        <View style={{flex: 1, marginTop: '-65%', padding: 10}}>
            {children}
        </View>
    </View>


};

export {ColorContainer};