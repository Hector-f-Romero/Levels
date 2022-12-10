var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany } from "typeorm";
import { Track } from "./Track";
let Genre = class Genre extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn()
], Genre.prototype, "idGenre", void 0);
__decorate([
    Column("varchar", { length: 15 })
], Genre.prototype, "nameGenre", void 0);
__decorate([
    OneToMany(() => Track, (track) => track.idGenre)
], Genre.prototype, "tracks", void 0);
Genre = __decorate([
    Entity("genres")
], Genre);
export { Genre };
