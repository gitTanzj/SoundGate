import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import 'dotenv/config';

const api = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID!,
    process.env.SPOTIFY_CLIENT_SECRET!
) 

export default api;
