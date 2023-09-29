import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try{
            const {currentUser} =  await serverAuth(req,res);
            const {movieId} = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where : {
                    id: movieId
                }
            });
            if(!existingMovie){
                throw new Error('Invalid ID');
            }
            if(req.method === "POST"){
                    const user = await prismadb.user.update({
                        where:{
                            email : currentUser.email || '',
                        },
                        data:{
                            favoriteIds:{
                                push: movieId
                            }
                        }
                    });

                    return res.status(200).json(user);

            }else if(req.method === "DELETE"){
                    const favoriteIds = without(currentUser.favoriteIds,movieId);
                    const user = await prismadb.user.update({
                        where:{
                            email : currentUser.email || '',
                        },
                        data:{
                            favoriteIds:favoriteIds,
                        }
                    });
                    
                    return res.status(200).json(user);
            }
            return res.status(405).end();
        
    } catch(error){
        console.log(error);
        return res.status(500).end();
    }
}