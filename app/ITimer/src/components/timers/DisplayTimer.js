import React from 'react'
import { View } from 'react-native'
import { Card, CardItem, Button, Text, Body, Grid, Col, H2, List, ListItem } from 'native-base'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'

const styles = {
  cardItemStyle: {
    marginRight: 15
  },
  totalTextStyle: {
    color: '#40CC49'
  },
  titleHeader: {
    fontWeight: 'bold'
  },
  titleText: {
		fontWeight: 'bold',
		fontSize: responsiveFontSize(2)
  }
}

const DisplayTimer = ({ time, phase, results, isStarted, stopTimer, goSetup, nPhase, uid, mode }) => {
	let total_distance = +results.reduce((sum, value) => sum + (+value.distance), 0).toFixed(3)
	let total_time = +results.reduce((sum, value) => sum + (+value.time), 0).toFixed(3)
	let speed_average = +(total_distance / total_time).toFixed(3)

  return (
    <Card>
      <CardItem header bordered style={{ justifyContent: 'center' }}>
        <H2 style={styles.titleHeader}>Time</H2>
      </CardItem>
      <CardItem style={{ justifyContent: 'center' }}>
        <H2>{`${time}`} s</H2>
      </CardItem>
      <CardItem style={{ justifyContent: 'center' }}>
        <Text>Phase: {phase} / { (mode === 'nonstop') ? 'unlimited' : nPhase }</Text>
      </CardItem>
      <CardItem style={{ justifyContent: 'center' }}>
        <Text>Mode: {mode}</Text>
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
                  <Col><Text style={styles.titleText}>Distance (m)</Text></Col>
                  <Col><Text style={styles.titleText}>Time (s)</Text></Col>
                  <Col><Text style={styles.titleText}>Speed (m/s)</Text></Col>
                </Grid>
              </ListItem>
            </CardItem>
            <CardItem cardBody style={styles.cardItemStyle}>
              <List dataArray={results} renderRow={(result) =>
                  <ListItem>
                  <Col><Text>{result.distance}</Text></Col>
                  <Col><Text>{result.time}</Text></Col>
                  <Col><Text>{result.speed}</Text></Col>
                  </ListItem>
              } />
            </CardItem>
            <CardItem cardBody style={styles.cardItemStyle}>
              <ListItem>
                  <Col><Text style={styles.totalTextStyle}>{total_distance}</Text></Col>
                  <Col><Text style={styles.totalTextStyle}>{total_time}</Text></Col>
                  <Col><Text style={styles.totalTextStyle}>{speed_average}</Text></Col>
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