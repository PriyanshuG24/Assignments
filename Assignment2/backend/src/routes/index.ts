import { Router } from 'express'
import { userRouter } from '../routes/user.routes.js'
import { claimRouter } from '../routes/claim.routes.js'
import { dealRouter } from '../routes/deal.route.js'
import { searchRouter } from './search.route.js'
export const apiRouter = Router()

apiRouter.use('/auth', userRouter)
apiRouter.use('/claim', claimRouter)
apiRouter.use('/deal', dealRouter)
apiRouter.use('/search', searchRouter)
