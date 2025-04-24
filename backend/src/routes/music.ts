import { Router } from "express";
import { getLikedSongs, swipe, getGenres, getMatches, getLovedSongs, getDislikedSongs, refreshPreferences, getSongAudio } from "../controllers/music.controller";


const router = Router();

router.post('/swipe', swipe)

router.get('/audio', getSongAudio)

router.get('/genres', getGenres)

router.get('/matches', getMatches)

router.get('/liked', getLikedSongs)

router.get('/loved', getLovedSongs)

router.get('/disliked', getDislikedSongs)

router.post('/refresh', refreshPreferences)

export default router;