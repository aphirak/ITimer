import React from 'react'
import { Modal } from 'components/commons'

export default ({ data, isActive, inActiveModal, total }) => {
	return (
			<Modal
				title='Detail'
				isActive={isActive}
				inActiveModal={inActiveModal}
			>
			{
			  <table className="table is-striped">
			    <thead>
			      <tr>
			        <th>Phase</th>
			        <th>Distance (m)</th>
			        <th>Time (s)</th>
			        <th>Speed (m/s)</th>
			      </tr>
			    </thead>
			    <tbody>
			    	{
			    		data.map((value, index) => {
			    			return (
						      <tr key={index}>
						        <td>{value.phase}</td>
						        <td>{value.distance}</td>
						        <td>{value.time}</td>
						        <td>{value.speed}</td>
						      </tr>
			    			)
			    		})
			    	}
		 			<tr>
		 				<td><strong>Total</strong></td>
		 				<td><strong>{total.total_distance}</strong></td>
		 				<td><strong>{total.total_time}</strong></td>
		 				<td><strong>{total.speed_average}</strong></td>
		 			</tr>
			    </tbody>
			  </table>
			}
			</Modal>
	)
}