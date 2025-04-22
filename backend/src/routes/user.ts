import { Router } from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.get('/', getUser)

router.put('/', updateUser)

router.delete('/', deleteUser)

export default router;