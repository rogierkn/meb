import React from "react";
import {View} from "react-native";
import {colors} from "../styles";

const ColorContainer = ({children, color = colors.colorContainer}) => {

    return <View style={{height: '100%'}}>
        <View style={{height: '40%', backgroundColor: color}}/>
        <View style={{flex: 1, marginTop: '-65%', padding: 10}}>
            {children}
        </View>
    </View>


};

export {ColorContainer};