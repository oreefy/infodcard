export interface MobileBankType {
    unique: string;
    logo: string;
    name: string;
    type: string;
    number: string;
    authorUnique: string;
}
export function MobileBankSelect() {
    return {
        unique: true,
        logo: true,
        name: true,
        type: true,
        number: true,
        authorUnique: true,
    }
}
export function MobileBankReturn(mobileBank: MobileBankType) {
    return mobileBank;
}
export function MobileBankReturns(mobileBanks: MobileBankType[]) {
    const response: MobileBankType[] = [];
    mobileBanks.map((mobileBank) => {
        response.push(MobileBankReturn(mobileBank));
    });
    return response;
}