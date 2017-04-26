import { Router } from 'express'

import web from 'src/routes/web'
import api from 'src/routes/api'

const router = Router()

router.use('/api', api)
router.use('/', web)

export default router
