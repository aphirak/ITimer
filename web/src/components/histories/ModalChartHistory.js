import React from 'react'
import { Modal } from 'components/commons'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip
} from 'recharts'

export default ({ data, isActive, inActiveModal }) => {
	return (
		<Modal
			title='Chart'
			isActive={isActive}
			inActiveModal={inActiveModal} >
			<h3>Time</h3>
			<br />
			<LineChart width={600} height={300} data={data.time} margin={{top: 5, right: 30, left: 5, bottom: 5}}>
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip formatter={(time) => `${time} s`} />
				<Line type='monotone' dataKey='Time' stroke='#00CCA9' strokeWidth='2' activeDot={{r: 8}} />
			</LineChart>
			<div>
				<strong>Vertical</strong> : time (s) , <strong>Horizontal</strong> : date (order)
			</div>
			<h3>Speed</h3>
			<br />
			<LineChart width={600} height={300} data={data.speed} margin={{top: 5, right: 30, left: 5, bottom: 5}}>
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip formatter={(speed) => `${speed} m/s`} />
				<Line type='monotone' dataKey='Speed' stroke='#00CCA9' strokeWidth='2' activeDot={{r: 8}} />
			</LineChart>
			<div>
				<strong>Vertical</strong> : speed (m/s) , <strong>Horizontal</strong> : date (order)
			</div>
		</Modal>
	)
}
