import express from 'express'

const router = express.Router() 

router.route('/')
	.get((req, res) => {
		res.send('Test API')
	})

export default router