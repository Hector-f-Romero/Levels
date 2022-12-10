var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, BaseEntity, ManyToMany, PrimaryColumn } from "typeorm";
import { Playlist } from "./Playlist";
export var UserType;
(function (UserType) {
    UserType["ADMIN"] = "Admin";
    UserType["USER"] = "User";
})(UserType || (UserType = {}));
let User = class User extends BaseEntity {
};
__decorate([
    PrimaryColumn()
], User.prototype, "idUser", void 0);
__decorate([
    Column("varchar", { length: 25 })
], User.prototype, "names", void 0);
__decorate([
    Column("varchar", { length: 25 })
], User.prototype, "lastNames", void 0);
__decorate([
    Column("varchar", { length: 20 })
], User.prototype, "userName", void 0);
__decorate([
    Column("varchar", { length: 50 })
], User.prototype, "email", void 0);
__decorate([
    Column("varchar", { length: 15 })
], User.prototype, "password", void 0);
__decorate([
    Column({ type: "enum", enum: UserType, default: UserType.USER })
], User.prototype, "userType", void 0);
__decorate([
    ManyToMany(() => Playlist, (playlist) => playlist.users)
], User.prototype, "playlists", void 0);
User = __decorate([
    Entity("users")
], User);
export { User };
