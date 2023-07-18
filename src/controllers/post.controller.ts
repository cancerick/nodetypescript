import { Request, Response } from 'express';
import axios from 'axios';

import Post, { PostMap } from '../models/Post';
import databaseConnection from '../db/config';

export const getAll = async (req: Request, res: Response) => {
    PostMap(databaseConnection);
    const posts = await Post.findAll();

    if(posts.length == 0) return res.status(200).json({ message: 'No existen post registrados.' });

    res.status(200).json(posts);
};

export const bulkInsert = async (req: Request, res: Response) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://jsonplaceholder.typicode.com/posts',
        headers: {}
    };

    PostMap(databaseConnection);

    axios.request(config)
        .then(response => response.data)
        .then(async json => {
            await Post
                    .bulkCreate(json)
                    .catch((error) => console.error(`Error bulkCreate: ${error}`));

            res.status(200).json({ message: `${json.length} post registrados a la bd.`});
        });
};
