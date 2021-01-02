import React from 'react'
import { View } from 'react-native'

const Obstacles = ({color, obstaclesWidth, obstaclesHeight, obstaclesBottom, obstaclesLeft, obstaclesHeightTwo, obstaclesLeftTwo}) => {
    return(
        <>
            <View
                style={{
                    backgroundColor:color,
                    width:obstaclesWidth,
                    height:obstaclesHeight,
                    position:'absolute',
                    bottom:obstaclesBottom,
                    left:obstaclesLeft
                }}
            />
            <View
                style={{
                    backgroundColor:color,
                    width:obstaclesWidth,
                    height:obstaclesHeightTwo,
                    position:'absolute',
                    bottom:obstaclesBottom,
                    left:obstaclesLeftTwo
                }}
            />
        </>
    )
}

export default Obstacles