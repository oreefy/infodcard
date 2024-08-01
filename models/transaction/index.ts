import { Create } from '@/models/transaction/create';
import { Update } from '@/models/transaction/update';
import { FindAll, FindUnique } from '@/models/transaction/find';
import { CouponGenerator, CheckStatus } from '@/models/transaction/others';
import { StatusFilter } from '@/models/transaction/filter';

const TransactionsModel = {
    create: Create,
    update: Update,
    find: {
        unique: FindUnique,
        all: FindAll,
    },
    checkStatus: CheckStatus,
    couponGenerator: CouponGenerator,
    filter: {
        status: StatusFilter,
    }
}

export default TransactionsModel;