import { Request, Response } from 'express';
import axios from 'axios';

import Comment, { CommentMap } from '../models/Comment';
import databaseConnection from '../db/config';

export const getAll = async (req: Request, res: Response) => {
    CommentMap(databaseConnection);
    const comments = await Comment.findAll();

    if(comments.length == 0) return res.status(200).json({ message: 'No existen comments registrados.' });

    res.status(200).json(comments);
};

export const bulkInsert = async (req: Request, res: Response) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://jsonplaceholder.typicode.com/comments',
        headers: {}
    };

    CommentMap(databaseConnection);

    axios.request(config)
        .then(response => response.data)
        .then(async json => {
            await Comment
                    .bulkCreate(json)
                    .catch((error) => console.error(`Error bulkCreate: ${error}`));

            res.status(200).json({ message: `${json.length} comments registrados a la bd.`});
        });
};
