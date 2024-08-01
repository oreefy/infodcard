export interface GroupItemType {
    unique: string;
    title: string | null;
    value: string | null;
    profileUnique: string;
}
export function GroupItemSelect() {
    return {
        unique: true,
        title: true,
        value: true,
        profileUnique: true,
    }
}
export function GroupItemReturn(groupItem: GroupItemType) {
    return groupItem;
}
export function GroupItemReturns(groupItems: GroupItemType[]) {
    const response: GroupItemType[] = [];
    groupItems.map((groupItem) => {
        response.push(GroupItemReturn(groupItem));
    });
    return response;
}