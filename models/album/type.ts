export interface AlbumType {
    unique: string;
    image: string;
    authorUnique: string;
}
export function AlbumSelect() {
    return {
        unique: true,
        image: true,
        authorUnique: true,
    }
}
export function AlbumReturn(album: AlbumType) {
    return album;
}
export function AlbumReturns(albums: AlbumType[]) {
    const response: AlbumType[] = [];
    albums.map((album) => {
        response.push(AlbumReturn(album));
    });
    return response;
}