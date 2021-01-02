import React from 'react'
import { View } from 'react-native'

const Runner = ({runnerLeft, runnerHeight, runnerWidth, runnerBottom}) => {
    return(
        <View
            style={{
                backgroundColor:'white',
                width:runnerWidth,
                height:runnerHeight,
                position:'absolute',
                left:runnerLeft,
                bottom:runnerBottom
            }}
        />
    )
}

export default Runner