import React from 'react'
import { View } from 'react-native'
import { Card, CardItem, Button, Text, Body, Grid, Col, H2, List, ListItem } from 'native-base'

const styles = {
  cardItemStyle: {
    marginRight: 15
  },
  totalTextStyle: {
    color: '#40CC49'
  },
  titleText: {
    fontWeight: 'bold'
  }
}

const DisplayTimer = ({ time, gate, results, isStarted, stopTimer, goSetup, nGate, uid, distances }) => {
  let total_distance = results.reduce((sum,value) => sum + (+value.distance), 0)
  let total_time = results.reduce((sum,value) => sum + (+value.time), 0).toFixed(3)
  let speedAverage = ((+total_distance)/(+total_time)).toFixed(3)

  return (
    <Card>
      <CardItem header bordered style={{ justifyContent: 'center' }}>
        <H2 style={styles.titleText}>Time</H2>
      </CardItem>
      <CardItem style={{ justifyContent: 'center' }}>
        <H2>{`${time}`} s</H2>
      </CardItem>
      <CardItem style={{ justifyContent: 'center' }}>
        <Text>Timing Gate: {gate} / {nGate}</Text>
      </CardItem>
      <CardItem style={{ justifyContent: 'center' }} bordered>
        <Text>User ID : {uid}</Text>
      </CardItem>
        {
          (results.length != 0) && (
            <View>
            <CardItem cardBody style={styles.cardItemStyle}>
              <ListItem>
                <Grid>
                  <Col><Text>Distance</Text></Col>
                  <Col><Text>Time</Text></Col>
                  <Col><Text>Speed</Text></Col>
                </Grid>
              </ListItem>
            </CardItem>
            <CardItem cardBody style={styles.cardItemStyle}>
              <List dataArray={results} renderRow={(result) =>
                  <ListItem>
                  <Col><Text>{result.distance} m</Text></Col>
                  <Col><Text>{result.time} s</Text></Col>
                  <Col><Text>{result.speed} m/s</Text></Col>
                  </ListItem>
              } />
            </CardItem>
            <CardItem cardBody style={styles.cardItemStyle}>
              <ListItem>
                  <Col><Text style={styles.totalTextStyle}>{total_distance} m</Text></Col>
                  <Col><Text style={styles.totalTextStyle}>{total_time} s</Text></Col>
                  <Col><Text style={styles.totalTextStyle}>{speedAverage} m/s</Text></Col>
              </ListItem>
            </CardItem>
            </View>
          )
        }
      <CardItem>
          <Body>
            <Button
              block danger={isStarted} bordered
              onPress={() => (isStarted) ? stopTimer() : goSetup()}
            >
              <Text>{(isStarted) ? 'Stop' : 'Go To Setup'}</Text>
            </Button>
          </Body>
      </CardItem>
    </Card>
  )
}

export default DisplayTimer