import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1672427472901 implements MigrationInterface {
    name = 'updatePostTable1672427472901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`genres\` (\`idGenre\` int NOT NULL AUTO_INCREMENT, \`nameGenre\` varchar(15) NOT NULL, PRIMARY KEY (\`idGenre\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`idUser\` varchar(255) NOT NULL, \`names\` varchar(25) NOT NULL, \`lastNames\` varchar(25) NOT NULL, \`userName\` varchar(20) COLLATE "utf8mb4_bin" NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(60) NOT NULL, \`userType\` enum ('Admin', 'User') NOT NULL DEFAULT 'User', PRIMARY KEY (\`idUser\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`playlists\` (\`idPlaylist\` int NOT NULL AUTO_INCREMENT, \`namePlaylist\` varchar(25) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idPlaylist\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tracks\` (\`idTrack\` int NOT NULL AUTO_INCREMENT, \`titleTrack\` varchar(25) NOT NULL, \`duration\` int NOT NULL, \`pathTrack\` varchar(25) NULL, \`coverTrack\` varchar(25) NULL, \`releaseDate\` smallint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`idGenre\` int NULL, \`idAlbum\` int NULL, \`idPrimaryArtist\` int NULL, PRIMARY KEY (\`idTrack\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`artists\` (\`idArtist\` int NOT NULL AUTO_INCREMENT, \`namesArtist\` varchar(25) NULL, \`lastNamesArtist\` varchar(25) NULL, \`stageName\` varchar(25) NOT NULL, \`typeArtist\` enum ('Artist', 'Group') NOT NULL DEFAULT 'Artist', \`bornDate\` date NOT NULL, \`countryOrigin\` varchar(25) NOT NULL, \`artistPhoto\` varchar(25) NULL, PRIMARY KEY (\`idArtist\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`albums\` (\`idAlbum\` int NOT NULL AUTO_INCREMENT, \`titleAlbum\` varchar(50) NOT NULL, \`releaseDate\` smallint NOT NULL, \`label\` varchar(25) NOT NULL, \`albumCover\` varchar(25) NULL, PRIMARY KEY (\`idAlbum\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`playlist_users\` (\`idPlaylist\` int NOT NULL, \`idUser\` varchar(255) NOT NULL, INDEX \`IDX_eff3da38393133e10d85878ada\` (\`idPlaylist\`), INDEX \`IDX_e1b04d4db800c01cf0f4a27ae2\` (\`idUser\`), PRIMARY KEY (\`idPlaylist\`, \`idUser\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`playlist_tracks\` (\`idPlaylist\` int NOT NULL, \`idTrack\` int NOT NULL, INDEX \`IDX_ba26817befd2c567679b494c68\` (\`idPlaylist\`), INDEX \`IDX_e48c215fcd67b818727368c9dc\` (\`idTrack\`), PRIMARY KEY (\`idPlaylist\`, \`idTrack\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`track_featured_artists\` (\`idTrack\` int NOT NULL, \`idFeaturedArtist\` int NOT NULL, INDEX \`IDX_4906c45881921ee3e4dba2aa1a\` (\`idTrack\`), INDEX \`IDX_f238362d7279c03d7749e337e8\` (\`idFeaturedArtist\`), PRIMARY KEY (\`idTrack\`, \`idFeaturedArtist\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`artist_albums\` (\`idArtist\` int NOT NULL, \`idAlbum\` int NOT NULL, INDEX \`IDX_6f4ba3ab5474e4191bfaeafb37\` (\`idArtist\`), INDEX \`IDX_1462e18fc56e302edca6c1b11f\` (\`idAlbum\`), PRIMARY KEY (\`idArtist\`, \`idAlbum\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tracks\` ADD CONSTRAINT \`FK_c0363db264bf8ea0af5d5c83ba7\` FOREIGN KEY (\`idGenre\`) REFERENCES \`genres\`(\`idGenre\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracks\` ADD CONSTRAINT \`FK_e3d8cff8fe28e4650fa5639e5ad\` FOREIGN KEY (\`idAlbum\`) REFERENCES \`albums\`(\`idAlbum\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracks\` ADD CONSTRAINT \`FK_ab879384aed94ac9dd6ef2958d0\` FOREIGN KEY (\`idPrimaryArtist\`) REFERENCES \`artists\`(\`idArtist\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`playlist_users\` ADD CONSTRAINT \`FK_eff3da38393133e10d85878ada5\` FOREIGN KEY (\`idPlaylist\`) REFERENCES \`playlists\`(\`idPlaylist\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`playlist_users\` ADD CONSTRAINT \`FK_e1b04d4db800c01cf0f4a27ae2f\` FOREIGN KEY (\`idUser\`) REFERENCES \`users\`(\`idUser\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`playlist_tracks\` ADD CONSTRAINT \`FK_ba26817befd2c567679b494c688\` FOREIGN KEY (\`idPlaylist\`) REFERENCES \`playlists\`(\`idPlaylist\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`playlist_tracks\` ADD CONSTRAINT \`FK_e48c215fcd67b818727368c9dcb\` FOREIGN KEY (\`idTrack\`) REFERENCES \`tracks\`(\`idTrack\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track_featured_artists\` ADD CONSTRAINT \`FK_4906c45881921ee3e4dba2aa1ab\` FOREIGN KEY (\`idTrack\`) REFERENCES \`tracks\`(\`idTrack\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`track_featured_artists\` ADD CONSTRAINT \`FK_f238362d7279c03d7749e337e85\` FOREIGN KEY (\`idFeaturedArtist\`) REFERENCES \`artists\`(\`idArtist\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`artist_albums\` ADD CONSTRAINT \`FK_6f4ba3ab5474e4191bfaeafb37b\` FOREIGN KEY (\`idArtist\`) REFERENCES \`artists\`(\`idArtist\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`artist_albums\` ADD CONSTRAINT \`FK_1462e18fc56e302edca6c1b11f5\` FOREIGN KEY (\`idAlbum\`) REFERENCES \`albums\`(\`idAlbum\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`artist_albums\` DROP FOREIGN KEY \`FK_1462e18fc56e302edca6c1b11f5\``);
        await queryRunner.query(`ALTER TABLE \`artist_albums\` DROP FOREIGN KEY \`FK_6f4ba3ab5474e4191bfaeafb37b\``);
        await queryRunner.query(`ALTER TABLE \`track_featured_artists\` DROP FOREIGN KEY \`FK_f238362d7279c03d7749e337e85\``);
        await queryRunner.query(`ALTER TABLE \`track_featured_artists\` DROP FOREIGN KEY \`FK_4906c45881921ee3e4dba2aa1ab\``);
        await queryRunner.query(`ALTER TABLE \`playlist_tracks\` DROP FOREIGN KEY \`FK_e48c215fcd67b818727368c9dcb\``);
        await queryRunner.query(`ALTER TABLE \`playlist_tracks\` DROP FOREIGN KEY \`FK_ba26817befd2c567679b494c688\``);
        await queryRunner.query(`ALTER TABLE \`playlist_users\` DROP FOREIGN KEY \`FK_e1b04d4db800c01cf0f4a27ae2f\``);
        await queryRunner.query(`ALTER TABLE \`playlist_users\` DROP FOREIGN KEY \`FK_eff3da38393133e10d85878ada5\``);
        await queryRunner.query(`ALTER TABLE \`tracks\` DROP FOREIGN KEY \`FK_ab879384aed94ac9dd6ef2958d0\``);
        await queryRunner.query(`ALTER TABLE \`tracks\` DROP FOREIGN KEY \`FK_e3d8cff8fe28e4650fa5639e5ad\``);
        await queryRunner.query(`ALTER TABLE \`tracks\` DROP FOREIGN KEY \`FK_c0363db264bf8ea0af5d5c83ba7\``);
        await queryRunner.query(`DROP INDEX \`IDX_1462e18fc56e302edca6c1b11f\` ON \`artist_albums\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f4ba3ab5474e4191bfaeafb37\` ON \`artist_albums\``);
        await queryRunner.query(`DROP TABLE \`artist_albums\``);
        await queryRunner.query(`DROP INDEX \`IDX_f238362d7279c03d7749e337e8\` ON \`track_featured_artists\``);
        await queryRunner.query(`DROP INDEX \`IDX_4906c45881921ee3e4dba2aa1a\` ON \`track_featured_artists\``);
        await queryRunner.query(`DROP TABLE \`track_featured_artists\``);
        await queryRunner.query(`DROP INDEX \`IDX_e48c215fcd67b818727368c9dc\` ON \`playlist_tracks\``);
        await queryRunner.query(`DROP INDEX \`IDX_ba26817befd2c567679b494c68\` ON \`playlist_tracks\``);
        await queryRunner.query(`DROP TABLE \`playlist_tracks\``);
        await queryRunner.query(`DROP INDEX \`IDX_e1b04d4db800c01cf0f4a27ae2\` ON \`playlist_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_eff3da38393133e10d85878ada\` ON \`playlist_users\``);
        await queryRunner.query(`DROP TABLE \`playlist_users\``);
        await queryRunner.query(`DROP TABLE \`albums\``);
        await queryRunner.query(`DROP TABLE \`artists\``);
        await queryRunner.query(`DROP TABLE \`tracks\``);
        await queryRunner.query(`DROP TABLE \`playlists\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`genres\``);
    }

}
