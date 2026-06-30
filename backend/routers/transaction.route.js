import { Router } from "express";
import { credit, debit, getTransaction } from "../controller/transaction.controller.js";
import auth from "../middleware/auth.middleware.js";


const router = Router()

router.use(auth)
router.post('/credit', credit)
router.post('/debit', debit)
router.get('/history', getTransaction)

export default router
