import { Request, Response } from "express";
import supabase from "../utils/supabase";
import { Database } from "../types/database.types";
import api from "../utils/spotify";
import gemini from '../utils/gemini';


export const swipe = async (req: Request, res: Response) => {
    if(req.user){
        try {
            const { songId, action } = req.body as { songId: string, action: 'like' | 'dislike' };

            const song = await api.tracks.get(songId);

            switch(action) {
                case 'like':
                    const { data, error } = await supabase.from('Liked Songs').upsert({
                        user_id: req.user.id,
                        songs: [ { id: song.id, name: song.name, artists: song.artists.map((artist: any) => artist.name), album: song.album.name, albumImage: song.album.images[0].url } ]
                    })

                    if(error){
                        throw error;
                    }

                    res.status(200).json({ message: 'Song liked' });
                case 'dislike':
                    const { data: dislikedData, error: dislikedError } = await supabase.from('Disliked Songs').upsert({
                        user_id: req.user.id,
                        songs: [ { id: song.id, name: song.name, artists: song.artists.map((artist: any) => artist.name), album: song.album.name, albumImage: song.album.images[0].url } ]
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

export const getSongAudio = async (req: Request, res: Response) => {
    if(req.user){
        try {
            
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
    if(req.user) {
        try {
            const { data: UserSongs, error: UserSongsError } = await supabase.from("Liked Songs").select("*").eq('user_id', req.user.id);

            if(UserSongsError) {
                throw UserSongsError
            }

            if(!UserSongs || UserSongs.length === 0) {
                res.status(404).json({ message: 'No liked songs found' });
            }

            const songList = UserSongs[0].songs.map((song: any) => {
                const name = typeof song === 'object' && song !== null ? song.name : '';
                const artist = typeof song === 'object' && song !== null && Array.isArray(song.artists) ? song.artists[0] : '';
                return `${name} - ${artist}`;
            }).join('\n');

            const prompt = `
                You are a professional song suggester.
                """
                ${songList}
                """
                1. Give me one song reccomendation based on the songs in between the triple quotes.
                2. Output only the song name and the artist in the following format: { song: string, artist: string }
            `

            const result = await gemini.generateContent(prompt) as any;

            res.status(200).json({ song: result.response.candidates[0].content })

        } catch(error) {
            res.status(500).json({ error: error })
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log('Unauthorized');
    }
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