var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Artist_1;
import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany, ManyToMany } from "typeorm";
import { Track } from "./Track";
export var ArtistType;
(function (ArtistType) {
    ArtistType["ARTIST"] = "Artist";
    ArtistType["GROUP"] = "Group";
})(ArtistType || (ArtistType = {}));
let Artist = Artist_1 = class Artist extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn()
], Artist.prototype, "idArtist", void 0);
__decorate([
    Column("varchar", { length: 25 })
], Artist.prototype, "namesArtist", void 0);
__decorate([
    Column("varchar", { length: 25 })
], Artist.prototype, "lastNamesArtist", void 0);
__decorate([
    Column("varchar", { length: 25 })
], Artist.prototype, "stageName", void 0);
__decorate([
    Column({ type: "enum", enum: ArtistType, default: ArtistType.ARTIST })
], Artist.prototype, "typeArtist", void 0);
__decorate([
    Column("date")
], Artist.prototype, "bornDate", void 0);
__decorate([
    Column("varchar", { length: 25 })
], Artist.prototype, "countryOrigin", void 0);
__decorate([
    Column("varchar", { length: 25, nullable: true })
], Artist.prototype, "artistPhoto", void 0);
__decorate([
    OneToMany(() => Track, (track) => track.idPrimaryArtist)
], Artist.prototype, "tracks", void 0);
__decorate([
    ManyToMany(() => Artist_1, (ftArtist) => ftArtist.tracks)
], Artist.prototype, "featuringArtists", void 0);
Artist = Artist_1 = __decorate([
    Entity("artists")
], Artist);
export { Artist };
