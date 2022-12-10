var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, } from "typeorm";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { Genre } from "./Genre";
import { Playlist } from "./Playlist";
let Track = class Track extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn()
], Track.prototype, "idTrack", void 0);
__decorate([
    Column("varchar", { length: 25 })
], Track.prototype, "titleTrack", void 0);
__decorate([
    Column("int")
], Track.prototype, "duration", void 0);
__decorate([
    Column("varchar", { length: 25, nullable: true })
], Track.prototype, "pathTrack", void 0);
__decorate([
    Column("varchar", { length: 25, nullable: true })
], Track.prototype, "coverTrack", void 0);
__decorate([
    Column("smallint")
], Track.prototype, "releaseDate", void 0);
__decorate([
    CreateDateColumn()
], Track.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => Genre, (genre) => genre.tracks),
    JoinColumn({ name: "idGenre" })
], Track.prototype, "idGenre", void 0);
__decorate([
    ManyToOne(() => Album, (album) => album.tracks),
    JoinColumn({ name: "idAlbum" })
], Track.prototype, "idAlbum", void 0);
__decorate([
    ManyToOne(() => Artist, (artist) => artist.tracks),
    JoinColumn({ name: "idPrimaryArtist" })
], Track.prototype, "idPrimaryArtist", void 0);
__decorate([
    ManyToMany(() => Playlist, (playlist) => playlist.tracks)
], Track.prototype, "playlists", void 0);
__decorate([
    ManyToMany(() => Artist, (artist) => artist.featuringArtists),
    JoinTable({
        name: "track_featured_artists",
        joinColumn: {
            name: "idTrack",
            referencedColumnName: "idTrack",
        },
        inverseJoinColumn: {
            name: "idFeaturedArtist",
            referencedColumnName: "idArtist",
        },
    })
], Track.prototype, "artists", void 0);
Track = __decorate([
    Entity("tracks")
], Track);
export { Track };
