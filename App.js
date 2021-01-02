import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Ground from './components/ground'
import Runner from './components/runner'
import Obstacles from './components/obstacles'


export default function App() {

  
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const groundBottom = 0
  const groundWidth = screenWidth
  const groundHeight = screenHeight * 0.2
  const runnerLeft = screenWidth * 0.08
  const runnerHeight = screenWidth * 0.1
  const runnerWidth = screenWidth * 0.1
  const [runnerBottom, setRunnerBottom] = useState(groundHeight)
  const obstaclesWidth = screenWidth * 0.1
  const [obstaclesHeight, setObstacleHeight] = useState(screenWidth * 0.1)
  const obstaclesBottom = screenHeight * 0.2 
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesHeightTwo, setObstacleHeightTwo] = useState(screenWidth * 0.1)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  let gameTimerID
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  const randomHeight = Math.random(10) * 50
  const randomHeightTwo = Math.random(10) * 50
  const randomWidth = Math.random(10) * 200


  // start falling
  useEffect(() => {
    if(runnerBottom > groundHeight){
      gameTimerID = setInterval(() => {
        setRunnerBottom(runnerBottom => runnerBottom - 10)
      }, 50)
      return () => {
        clearInterval(gameTimerID)
      } 
    }
  }, [runnerBottom])
  // start jump
  const jump = () => {
    if(!isGameOver && (runnerBottom == groundHeight)){
      setRunnerBottom(runnerBottom => runnerBottom + 200)
    }
  }

  // start first obstacles
  useEffect(() => {
    if(obstaclesLeft > -obstaclesWidth){
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft -5)
      }, 20)
      return() => {
        clearInterval(obstaclesLeftTimerId)
      }
    }else{
      setObstacleHeight(screenWidth * 0.1 + randomHeight )
      setObstaclesLeft(screenWidth)
      setScore(score => score +1)
    }
    
  }, [obstaclesLeft])


  // start second obstacles
  useEffect(() => {
    if(obstaclesLeftTwo > -obstaclesWidth){
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo -5)
      }, 20)
      return() => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    }else{
      setObstacleHeightTwo(screenWidth * 0.1 + randomHeightTwo )
      setObstaclesLeftTwo(screenWidth)
      setScore(score => score + 1)
    }
    
  }, [obstaclesLeftTwo])

  // check for collisions
  useEffect(() => {
    if((runnerBottom <= obstaclesBottom + obstaclesHeight) && ((obstaclesLeft <= runnerLeft + runnerWidth ) && (runnerLeft <= obstaclesLeft + obstaclesWidth)) ||
    (runnerBottom <= obstaclesBottom + obstaclesHeightTwo) && ((obstaclesLeftTwo <= runnerLeft + runnerWidth ) && (runnerLeft <= obstaclesLeftTwo + obstaclesWidth))
    ){
      gameOver()
    }
  })

  const gameOver = () => {
    setIsGameOver(isGameOver => isGameOver = true)
    clearInterval(gameTimerID)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
  }


  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text style={{ color:'red', fontSize:40, bottom:screenHeight * 0.1}}>Game Over</Text>}
        <Text style={{ color:'white', fontSize:60, bottom:screenHeight * 0.3}}>{score}</Text>
        <Ground
          groundBottom={groundBottom}
          groundHeight={groundHeight}
          groundWidth={groundWidth}
        />
        <Runner
          runnerLeft={runnerLeft}
          runnerHeight={runnerHeight}
          runnerWidth={runnerWidth}
          runnerBottom={runnerBottom}
        />
        <Obstacles
          color={'green'}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          obstaclesBottom={obstaclesBottom}
          obstaclesLeft={obstaclesLeft}
        />
        <Obstacles
          color={'yellow'}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeightTwo={obstaclesHeightTwo}
          obstaclesBottom={obstaclesBottom}
          obstaclesLeftTwo={obstaclesLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
