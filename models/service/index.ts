import { FindUnique, FindProfileProducts } from '@/models/service/find';
import { Create } from '@/models/service/create';
import { Update } from '@/models/service/update';
import { Delete } from '@/models/service/delete';

const ServiceModel = {
    find: {
        unique: FindUnique,
        profileProducts: FindProfileProducts,
    },
    create: Create,
    delete: Delete,
    update: Update,
}

export default ServiceModel;