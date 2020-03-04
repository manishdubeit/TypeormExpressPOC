import { Entity, Column, OneToOne, ManyToMany } from "typeorm";
import { MinLength, MaxLength, IsEmail, IsNotEmpty } from "class-validator";
import { Escape, Trim, ToInt } from "class-sanitizer";
import { Base as BaseEntity } from "./BaseEntity";
import { PhotoMetadata } from "./PhotoMetaDataEntity";
import { Album } from './AlbumEntity';

@Entity()
export class Photo extends BaseEntity {
    @Column({
        length: 100
    })
    @IsNotEmpty()
    name: string;

    @Column("text")
    @IsNotEmpty()
    @MinLength(5, {
        message: "Title is too short. Minimal length is $constraint1 characters, but actual is $value"
    })
    @MaxLength(50, {
        message: "Title is too long. Maximal length is $constraint1 characters, but actual is $value"
    })
    @Trim()
    @Escape()
    description: string;

    @Column()
    @IsNotEmpty()
    @Trim()
    @Escape()
    filename: string;

    @Column("double")
    views: number;

    @Column()
    isPublished: boolean;


    @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo, {
        cascade: true,
    })
    metadata: PhotoMetadata;

    @ManyToMany(type => Album, album => album.photos, {
        cascade: true,
    })
    albums: Album[];
}