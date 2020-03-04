
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { sanitize } from "class-sanitizer";
import * as httpStatusCodes from 'http-status-codes';
import apiResponse from '../utilities/apiResponse';
import { Photo as PhotoEntity } from "../entity/PhotoEntity";
import { PhotoMetadata as PhotoMetadataEntity } from "../entity/PhotoMetaDataEntity";
import { Album as AlbumEntity } from "../entity/AlbumEntity";
import * as paginate from './../helper/pagination';

class PhotoController {
    constructor() { }

    static listAll = async (req: Request, res: Response) => {
        const photoRepository = getRepository(PhotoEntity);
        let limit = req.query.hasOwnProperty('limit') ? req.query.limit : 10;
        let page = req.query.hasOwnProperty('page') ? req.query.page : 0;
        if (!page) {
            page = 0
        }
        if (!limit) {
            limit = 0
        }
        let pageUrl = "http://localhost:5000/photo?page=";
        const [results, total] = await photoRepository.findAndCount({
            select: ["id", "filename", "name", "isPublished"],
            order: {
                id: "DESC"
            },
            take: limit,
            skip: page * limit,
        });

        let pageData = paginate.paginate(results, total, pageUrl, parseInt(page), parseInt(limit));
        //Send the photos object
        apiResponse.success(res, pageData, httpStatusCodes.OK);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = req.params.id;

        //Get the photo from database
        const photoRepository = getRepository(PhotoEntity);
        try {
            const photo = await photoRepository.findOneOrFail(id, {
                select: ["id", "description", "filename", "name", "isPublished", "views"] //We dont want to send the password on response
            });
            apiResponse.success(res, photo, httpStatusCodes.OK);
        } catch (error) {
            apiResponse.error(res, httpStatusCodes.NOT_FOUND, error);
        }
    };


    static newPhotoWithMetaData = async (req: any, res: Response) => {

        // // ***************  save photo and metadata together   **************///////
        // create photo object
        let photo = new PhotoEntity();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo-with-bears.jpg";
        photo.isPublished = true;

        // create photo metadata object
        let metadata = new PhotoMetadataEntity();
        metadata.height = 640;
        metadata.width = 480;
        metadata.compressed = true;
        metadata.comment = "cybershoot";
        metadata.orientation = "portait";

        photo.metadata = metadata; // this way we connect them

        // get repository
        let photoRepository = getRepository(PhotoEntity);

        // saving a photo also save the metadata
        await photoRepository.save(photo);
        console.log("Photo is saved, photo metadata is saved too.");

        apiResponse.success(res, { res: 'Photo with metadata created' }, httpStatusCodes.CREATED);
    };


    static newPhotoWithAlbums = async (req: any, res: Response) => {
        // // ***************** Create album and photo together  ************////////////
        // create a few albums
        let album1 = new AlbumEntity();
        album1.name = "Bears";
        // albumRepository.manager.save(album1);

        let album2 = new AlbumEntity();
        album2.name = "Me";
        // albumRepository.manager.save(album2);

        let photoRepository = getRepository(PhotoEntity);
        // create a few photos
        let photo = new PhotoEntity();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo-with-bears.jpg";
        photo.albums = [album1, album2];
        photoRepository.manager.save(photo);
        const photoData = await photoRepository.findOne(20, { relations: ["albums"] });

        apiResponse.success(res, { res: 'Photo with albums created' }, httpStatusCodes.CREATED);
    };


    static newPhoto = async (req: any, res: Response) => {
        console.log('files:', req.files);
        //Get parameters from the body
        let { name, views, description, isPublished } = req.body;
        // console.log('req.body', req.body);
        let photo = new PhotoEntity();
        photo.filename = 'req.file.filename';
        photo.name = name;
        photo.views = views;
        photo.description = description;
        photo.isPublished = isPublished;
        //Validade if the parameters are ok
        const errors = await validate(photo, { validationError: { target: false } });
        if (errors.length > 0) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST, errors);
            return;
        }
        //Try to save. If fails, the username is already in use
        const photoRepository = getRepository(PhotoEntity);
        try {
            await photoRepository.save(photo);
        } catch (e) {
            apiResponse.error(res, httpStatusCodes.CONFLICT, 'photo already in db');
            return;
        }

        apiResponse.success(res, { res: 'Photo created' }, httpStatusCodes.CREATED);
    };

    static editPhoto = async (req: Request, res: Response) => {
        const id = req.params.id;
        let { filename, name, views, description, isPublished } = req.body;
        const photoRepository = getRepository(PhotoEntity);
        let photo;
        try {
            photo = await photoRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            apiResponse.error(res, httpStatusCodes.NOT_FOUND, error);
            return;
        }

        //Validate the new photos on model
        photo.filename = filename;
        photo.name = name;
        photo.views = views;
        photo.description = description;
        photo.isPublished = isPublished;

        const errors = await validate(photo);
        if (errors.length > 0) {
            apiResponse.error(res, httpStatusCodes.BAD_REQUEST, errors);
            return;
        }

        try {
            await photoRepository.save(photo);
        } catch (e) {
            apiResponse.error(res, httpStatusCodes.CONFLICT, 'photos already in db');
            return;
        }
        apiResponse.success(res, { res: 'Photo updated' }, httpStatusCodes.NO_CONTENT);
    };

    static deletePhoto = async (req: Request, res: Response) => {
        const id = req.params.id;

        const photoRepository = getRepository(PhotoEntity);
        let photo: PhotoEntity;
        try {
            photo = await photoRepository.findOneOrFail(id);
        } catch (error) {
            apiResponse.error(res, httpStatusCodes.NOT_FOUND, error);
            return;
        }
        photoRepository.delete(id);
        apiResponse.success(res, { res: 'Photo deleted' }, httpStatusCodes.NO_CONTENT);
    };
};

export default PhotoController;
