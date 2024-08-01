export interface GlobalBankType {
    unique: string;
    logo: string;
    bank: string;
    lineOne: string;
    lineTwo: string;
    lineThree: string;
    authorUnique: string;
}
export function GlobalBankSelect() {
    return {
        unique: true,
        logo: true,
        bank: true,
        lineOne: true,
        lineTwo: true,
        lineThree: true,
        authorUnique: true,
    }
}
export function GlobalBankReturn(globalBank: GlobalBankType) {
    return globalBank;
}
export function GlobalBankReturns(globalBanks: GlobalBankType[]) {
    const response: GlobalBankType[] = [];
    globalBanks.map((globalBank) => {
        response.push(GlobalBankReturn(globalBank));
    });
    return response;
}