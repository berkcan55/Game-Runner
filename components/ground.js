import React from 'react'
import { View } from 'react-native'

const Ground = ({groundBottom, groundHeight, groundWidth}) => {
    return(
        <View
            style={{
                backgroundColor:'brown',
                position:'absolute',
                width:groundWidth,
                height:groundHeight,
                bottom:groundBottom
            }}
        />
    )
}

export default Ground