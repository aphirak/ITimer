import React, { Component } from 'react'
import { Card, CardItem, Text, Body, Button, ListItem, Col, Grid, List } from 'native-base'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'

const styles = {
	titleText: {
		fontWeight: 'bold',
		fontSize: responsiveFontSize(2)		
	},
	totalTextStyle: {
		color: '#40CC49',
		fontWeight: 'bold'
	}
}

export default class DetailHistory extends Component {
	render(){
		return (
            <Card>
                <CardItem cardBody bordered>
					<ListItem>
						<Grid>
							<Col><Text style={styles.titleText}>Distance (m)</Text></Col>
							<Col><Text style={styles.titleText}>Time (s)</Text></Col>
							<Col><Text style={styles.titleText}>Speed (m/s)</Text></Col>
						</Grid>
					</ListItem>
                </CardItem>
                <CardItem cardBody>
                    <List dataArray={this.props.params.details} renderRow={(detail) =>
                        <ListItem>
		                    <Col><Text>{detail.distance}</Text></Col>
		                    <Col><Text>{detail.time}</Text></Col>
		                    <Col><Text>{detail.speed}</Text></Col>
                        </ListItem>
                    } />
                </CardItem>
	            <CardItem cardBody style={styles.cardItemStyle}>
	              <ListItem>
	                  <Col><Text style={styles.totalTextStyle}>{this.props.params.total.total_distance}</Text></Col>
	                  <Col><Text style={styles.totalTextStyle}>{this.props.params.total.total_time}</Text></Col>
	                  <Col><Text style={styles.totalTextStyle}>{this.props.params.total.speed_average}</Text></Col>
	              </ListItem>
	            </CardItem>
           </Card>
		)
	}
}