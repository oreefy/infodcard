import { FindUnique, FindProfileGroupItems } from '@/models/groupItem/find';
import { CreateMany } from '@/models/groupItem/create';
import { UpdateMany } from '@/models/groupItem/update';

const GroupItemModel = {
    find: {
        unique: FindUnique,
        ProfileGroupItems: FindProfileGroupItems,
    },
    createMany: CreateMany,
    updateMany: UpdateMany,
}
export default GroupItemModel;