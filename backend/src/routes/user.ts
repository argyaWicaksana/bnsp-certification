import { Router, Request, Response, NextFunction } from 'express';

const router = Router()


router.get('/', function (req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({
            msg: "just test"
        })
    } catch (error) {
        next(error)
    }
})

export default router