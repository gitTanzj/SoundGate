import { Request, Response } from "express";

export const swipe = async (req: Request, res: Response) => {
    // removes or adds a song from the user's liked songs
    if(req.user){
        const { songId, action } = req.body;
        const { data, error } = await 
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log('Unauthorized');
    }
}

export const getGenres = async (req: Request, res: Response) => {

}     

export const getMatches  = async (req: Request, res: Response) => {

}

export const getLikedSongs = async (req: Request, res: Response) => {

}

export const getLovedSongs = async (req: Request, res: Response) => {

}

export const getDislikedSongs = async (req: Request, res: Response) => {

}

export const refreshPreferences = async (req: Request, res: Response) => {

}