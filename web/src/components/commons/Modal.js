import React from 'react'

export default ({ title, isActive, inActiveModal, children }) => {
	return (
		<div className={`modal ${isActive && 'is-active'}`}>
			<div className='modal-background' onClick={inActiveModal} />
			<div className='modal-card'>
				<header className='modal-card-head'>
					<p className='modal-card-title'>
						<span className='title'>
							<strong>{title}</strong>
						</span>
					</p>
				</header>
				<section className='modal-card-body'>
					<div className='content'>
						{children}
					</div>
				</section>
				<footer className='modal-card-foot' />
			</div>
			<button onClick={inActiveModal} className='modal-close' />
		</div>
	)
}
