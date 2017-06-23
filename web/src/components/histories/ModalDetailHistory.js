import React from 'react'
import { Modal } from 'components/commons'

export default ({ data, isActive, inActiveModal, total }) => {
	return (
		<Modal
			title='Detail'
			isActive={isActive}
			inActiveModal={inActiveModal} >
			{
				<table className='table is-striped'>
					<thead>
						<tr>
							<th style={{ 'textAlign': 'center' }}>Lap</th>
							<th style={{ 'textAlign': 'center' }}>Distance (m)</th>
							<th style={{ 'textAlign': 'center' }}>Time (s)</th>
							<th style={{ 'textAlign': 'center' }}>Speed (m/s)</th>
						</tr>
					</thead>
					<tbody>
						{
							data.map((value, index) => {
								return (
									<tr key={index}>
										<td style={{ 'textAlign': 'center' }}>{value.phase}</td>
										<td style={{ 'textAlign': 'center' }}>{value.distance <= 0 ? 'Incorrect' : value.distance}</td>
										<td style={{ 'textAlign': 'center' }}>{value.time}</td>
										<td style={{ 'textAlign': 'center' }}>{value.speed <= 0 ? 'Incorrect' : value.speed}</td>
									</tr>
								)
							})
						}
						<tr>
							<td style={{ 'textAlign': 'center' }}><strong>Total</strong></td>
							<td style={{ 'textAlign': 'center' }}><strong>{total.total_distance}</strong></td>
							<td style={{ 'textAlign': 'center' }}><strong>{total.total_time}</strong></td>
							<td style={{ 'textAlign': 'center' }}><strong>{total.speed_average}</strong></td>
						</tr>
					</tbody>
				</table>
			}
		</Modal>
	)
}
