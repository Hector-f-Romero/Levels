var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Track } from "./Track";
import { User } from "./User";
let Playlist = class Playlist extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn()
], Playlist.prototype, "idPlaylist", void 0);
__decorate([
    Column("varchar", { length: 25 })
], Playlist.prototype, "namePlaylist", void 0);
__decorate([
    CreateDateColumn()
], Playlist.prototype, "createdAt", void 0);
__decorate([
    ManyToMany(() => User, (user) => user.playlists),
    JoinTable({
        name: "playlist_users",
        joinColumn: {
            name: "idPlaylist",
            referencedColumnName: "idPlaylist",
        },
        inverseJoinColumn: {
            name: "idUser",
            referencedColumnName: "idUser",
        },
    })
], Playlist.prototype, "users", void 0);
__decorate([
    ManyToMany(() => Track, (track) => track.playlists),
    JoinTable({
        name: "playlist_tracks",
        joinColumn: {
            name: "idPlaylist",
            referencedColumnName: "idPlaylist",
        },
        inverseJoinColumn: {
            name: "idTrack",
            referencedColumnName: "idTrack",
        },
    })
], Playlist.prototype, "tracks", void 0);
Playlist = __decorate([
    Entity("playlists")
], Playlist);
export { Playlist };
