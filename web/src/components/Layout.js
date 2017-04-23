import React from 'react'

const Layout = ({ title, children, size }) => {
	return (
		<div className='has-text-centered'>
			<div className='heading'>
				<h1 className='title'>
					<strong>{title}</strong>
				</h1>
			</div>
			<hr />
			<div className={`content ${size}`}>
				{children}
			</div>
		</div>
	)
}

export default Layout
