import { GroupItemType, GroupItemSelect, GroupItemReturns } from '@/models/groupItem/type';
import { SocialType, SocialSelect, SocialReturns } from '@/models/social/type';
import { ProductType, ProductSelect, ProductReturns } from '@/models/product/type';
import { ServiceType, ServiceSelect, ServiceReturns } from '@/models/service/type';
import { AlbumType, AlbumSelect, AlbumReturns } from '@/models/album/type';
import { LocalBankType, LocalBankSelect, LocalBankReturns } from '@/models/bank/local/type';
import { MobileBankType, MobileBankSelect, MobileBankReturns } from '@/models/bank/mobile/type';
import { GlobalBankType, GlobalBankSelect, GlobalBankReturns } from '@/models/bank/global/type';

export interface ProfileType {
    unique: string;
    link: string;
    name: string;
    cover?: string;
    avatar?: string;
    youtube?: string | null;
    delete?: boolean;
    website?: string | null;
    phone?: string | null;
    bio?: string | null;
    company?: string | null;
    companyphone?: string | null;
    companyemail?: string | null;
    designation?: string | null;
    corporate?: string | null;
    branch?: string | null;
    email?: string | null;
    address?: string | null;
    groupName?: string | null;
    groupItems?: GroupItemType[];
    profession?: string | null;
    qr?: string;
    socials?: SocialType[];
    products?: ProductType[];
    services?: ServiceType[];
    albums?: AlbumType[];
    localBanks?: LocalBankType[];
    mobileBanks?: MobileBankType[];
    globalBanks?: GlobalBankType[];
    authorUnique?: string;
    updatedAt?: Date;
    createdAt?: Date;
}
export function ProfileSelect(fields?: string) {
    return {
        unique: true,
        link: true,
        name: true,
        cover: fields?.includes("profile.cover"),
        avatar: fields?.includes("profile.avatar"),
        youtube: fields?.includes("profile.youtube"),
        delete: fields?.includes("profile.delete"),
        website: fields?.includes("profile.website"),
        phone: fields?.includes("profile.phone"),
        bio: fields?.includes("profile.bio"),
        company: fields?.includes("profile.company"),
        companyphone: fields?.includes("profile.companyphone"),
        companyemail: fields?.includes("profile.companyemail"),
        designation: fields?.includes("profile.designation"),
        corporate: fields?.includes("profile.corporate"),
        branch: fields?.includes("profile.branch"),
        email: fields?.includes("profile.email"),
        address: fields?.includes("profile.address"),
        groupName: fields?.includes("profile.groupName"),
        groupItems: fields?.includes("profile.groupItems") ? { select: GroupItemSelect() } : false,
        profession: fields?.includes("profile.profession"),
        qr: fields?.includes("profile.qr"),
        socials: fields?.includes("profile.socials") ? { select: SocialSelect() } : false,
        products: fields?.includes("profile.products") ? { select: ProductSelect() } : false,
        services: fields?.includes("profile.services") ? { select: ServiceSelect() } : false,
        albums: fields?.includes("profile.albums") ? { select: AlbumSelect() } : false,
        localBanks: fields?.includes("profile.localBanks") ? { select: LocalBankSelect() } : false,
        mobileBanks: fields?.includes("profile.mobileBanks") ? { select: MobileBankSelect() } : false,
        globalBanks: fields?.includes("profile.globalBanks") ? { select: GlobalBankSelect() } : false,
        authorUnique: fields?.includes("profile.authorUnique"),
        updatedAt: fields?.includes("profile.updatedAt"),
        createdAt: fields?.includes("profile.createdAt"),
    }
}
export function ProfileReturn(profile: ProfileType, fields?: string) {
    const response: ProfileType = { unique: "", link: "", name: "" };
    response.unique = profile.unique;
    response.link = profile.link;
    response.name = profile.name;
    if (fields?.includes("profile.cover")) { response.cover = profile.cover }
    if (fields?.includes("profile.avatar")) { response.avatar = profile.avatar }
    if (fields?.includes("profile.youtube")) { response.youtube = profile.youtube }
    if (fields?.includes("profile.delete")) { response.delete = profile.delete }
    if (fields?.includes("profile.website")) { response.website = profile.website }
    if (fields?.includes("profile.phone")) { response.phone = profile.phone }
    if (fields?.includes("profile.bio")) { response.bio = profile.bio }
    if (fields?.includes("profile.company")) { response.company = profile.company }
    if (fields?.includes("profile.companyphone")) { response.companyphone = profile.companyphone }
    if (fields?.includes("profile.companyemail")) { response.companyemail = profile.companyemail }
    if (fields?.includes("profile.designation")) { response.designation = profile.designation }
    if (fields?.includes("profile.corporate")) { response.corporate = profile.corporate }
    if (fields?.includes("profile.branch")) { response.branch = profile.branch }
    if (fields?.includes("profile.email")) { response.email = profile.email }
    if (fields?.includes("profile.address")) { response.address = profile.address }
    if (fields?.includes("profile.groupName")) { response.groupName = profile.groupName }
    if (fields?.includes("profile.groupItems")) { response.groupItems = GroupItemReturns(profile.groupItems!) }
    if (fields?.includes("profile.profession")) { response.profession = profile.profession }
    if (fields?.includes("profile.qr")) { response.qr = profile.qr }
    if (fields?.includes("profile.socials")) { response.socials = SocialReturns(profile.socials!) }
    if (fields?.includes("profile.products")) { response.products = ProductReturns(profile.products!) }
    if (fields?.includes("profile.services")) { response.services = ServiceReturns(profile.services!) }
    if (fields?.includes("profile.albums")) { response.albums = AlbumReturns(profile.albums!) }
    if (fields?.includes("profile.localBanks")) { response.localBanks = LocalBankReturns(profile.localBanks!) }
    if (fields?.includes("profile.mobileBanks")) { response.mobileBanks = MobileBankReturns(profile.mobileBanks!) }
    if (fields?.includes("profile.globalBanks")) { response.globalBanks = GlobalBankReturns(profile.globalBanks!) }
    if (fields?.includes("profile.authorUnique")) { response.authorUnique = profile.authorUnique }
    if (fields?.includes("profile.updatedAt")) { response.updatedAt = profile.updatedAt }
    if (fields?.includes("profile.createdAt")) { response.createdAt = profile.createdAt }
    return response;
}
export function ProfileReturns(profiles: ProfileType[], fields?: string) {
    const response: ProfileType[] = [];
    profiles.map((profile) => {
        response.push(ProfileReturn(profile, fields));
    });
    return response;
}