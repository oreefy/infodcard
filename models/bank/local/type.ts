export interface LocalBankType {
    unique: string;
    logo: string;
    bank: string;
    name: string;
    number: string;
    branch: string;
    authorUnique: string;
}
export function LocalBankSelect() {
    return {
        unique: true,
        logo: true,
        bank: true,
        name: true,
        number: true,
        branch: true,
        authorUnique: true,
    }
}
export function LocalBankReturn(localBank: LocalBankType) {
    return localBank;
}
export function LocalBankReturns(localBanks: LocalBankType[]) {
    const response: LocalBankType[] = [];
    localBanks.map((localBank) => {
        response.push(LocalBankReturn(localBank));
    });
    return response;
}