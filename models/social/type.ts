export interface SocialType {
    unique: string;
    type: boolean;
    logo: string;
    link: string;
    title: string;
    authorUnique: string;
}
export function SocialSelect() {
    return {
        unique: true,
        type: true,
        logo: true,
        link: true,
        title: true,
        authorUnique: true,
    }
}
export function SocialReturn(social: SocialType) {
    return social;
}
export function SocialReturns(socials: SocialType[]) {
    const response: SocialType[] = [];
    socials.map((social) => {
        response.push(SocialReturn(social));
    });
    return response;
}