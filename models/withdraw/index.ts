import { FindMany, FindUnique } from '@/models/withdraw/find';
import { Create } from '@/models/withdraw/create';
import { Update } from '@/models/withdraw/update';
import { StatusFilter } from '@/models/withdraw/filter';

const WithdrawModel = {
    find: {
        unique: FindUnique,
        many: FindMany,
    },
    create: Create,
    update: Update,
    filter: {
        status: StatusFilter,
    }
}

export default WithdrawModel;