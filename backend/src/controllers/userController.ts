import { Request, Response } from "express";
import supabase from "../utils/supabase";

export const getUser = async (req: Request, res: Response) => {
    if(req.user){
        try {
            const { data, error } = await supabase.from('Users').select('*').eq('id', req.user.id).single();

            if(error){
                throw error;
            }

            res.status(200).json(data);
        } catch(error: any) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log('Unauthorized');
    }
}

export const updateUser = async (req: Request, res: Response) => {
    if(req.user){
        try {
            const { data, error } = await supabase.from('Users').update(req.body).eq('id', req.user.id);

            if(error){
                throw error;
            }

            res.status(200).json(data);
        } catch(error: any) {
            
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log('Unauthorized');
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    if(req.user){
        try {
            const { data, error } = await supabase.from('Users').delete().eq('id', req.user.id);

            if(error){
                throw error;
            }

            res.status(200).json({ message: 'User deleted' });
        } catch(error: any) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
        console.log('Unauthorized');
    }
}