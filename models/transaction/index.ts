import { Create } from '@/models/transaction/create';
import { Update } from '@/models/transaction/update';
import { FindAll, FindMany, FindUnique } from '@/models/transaction/find';
import { CouponGenerator, CheckStatus } from '@/models/transaction/others';
import { StatusFilter } from '@/models/transaction/filter';

const TransactionsModel = {
    create: Create,
    update: Update,
    find: {
        unique: FindUnique,
        many: FindMany,
        all: FindAll,
    },
    checkStatus: CheckStatus,
    couponGenerator: CouponGenerator,
    filter: {
        status: StatusFilter,
    }
}

export default TransactionsModel;