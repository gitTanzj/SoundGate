import { Request, Response } from "express";
import supabase from "../utils/supabase";
import { Database } from "../types/database.types";
import api from "../utils/spotify";

export const swipe = async (req: Request, res: Response) => {
    if(req.user){
        try {
            const { songId, action } = req.body as { songId: string, action: 'like' | 'dislike' };

            const song = await api.tracks.get(songId);

            switch(action) {
                case 'like':
                    const { data, error} = await supabase.from('Liked Songs').upsert({
                        user_id: req.user.id,
                        songs: [ { id: song.id, name: song.name, artists: song.artists.map((artist) => artist.name), album: song.album.name, albumImage: song.album.images[0].url } ]
                    })

                    if(error){
                        throw error;
                    }

                    res.status(200).json({ message: 'Song liked' });
                case 'dislike':
                    const { data: dislikedData, error: dislikedError } = await supabase.from('Disliked Songs').upsert({
                        user_id: req.user.id,
                        songs: [ { id: song.id, name: song.name, artists: song.artists.map((artist) => artist.name), album: song.album.name, albumImage: song.album.images[0].url } ]
                    })
                    
                    if(dislikedError){
                        throw dislikedError;
                    }

                    res.status(200).json({ message: 'Song disliked' });

                default:
                    throw new Error('Invalid action');
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }      
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
    if(req.user){
        try {
            const { data, error } = await supabase.from('Liked Songs').select('*').eq('user_id', req.user.id);

            if(error){
                throw error;
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log('Unauthorized');
    }
}

export const getLovedSongs = async (req: Request, res: Response) => {

}

export const getDislikedSongs = async (req: Request, res: Response) => {
    if(req.user){
        try {
            const { data, error } = await supabase.from('Disliked Songs').select('*').eq('user_id', req.user.id);

            if(error){
                throw error;
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log('Unauthorized');
    }
}

export const refreshPreferences = async (req: Request, res: Response) => {

}