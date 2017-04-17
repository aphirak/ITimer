import React, { Component } from 'react'

import { logoWebpack,
	logoRedux,
	logoReact,
	logoBulma
} from 'assets/images'

export default class Footer extends Component {
	render () {
		return (
			<footer className="footer">
				<div className="container">
					<div className="content has-text-centered">
						<p>
							<strong>Development By</strong>
						</p>
						<div className="columns">
							<div className="column is-4" />
							<div className="column">
								<figure className="image is-64x64">
									<img src={logoReact} />
								</figure>
							</div>
							<div className="column">
								<figure className="image is-64x64">
									<img src={logoRedux} />
								</figure>
							</div>
							<div className="column">
								<figure className="image is-64x64">
									<img src={logoBulma} />
								</figure>
							</div>
							<div className="column">
								<figure className="image is-64x64">
									<img src={logoWebpack} />
								</figure>
							</div>
							<div className="column is-4" />
						</div>
					</div>
				</div>
			</footer>
		)
	}
}
