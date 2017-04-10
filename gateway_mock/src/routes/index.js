import { Router } from 'express'

import users from 'src/routes/users'

const router = Router()

router.use('/users', users)

export default router
