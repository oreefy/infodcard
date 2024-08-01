import { FindUnique, FindProfileProducts } from '@/models/product/find';
import { Create } from '@/models/product/create';
import { Update } from '@/models/product/update';
import { Delete } from '@/models/product/delete';

const ProductModel = {
    find: {
        unique: FindUnique,
        profileProducts: FindProfileProducts,
    },
    create: Create,
    delete: Delete,
    update: Update,
}

export default ProductModel;