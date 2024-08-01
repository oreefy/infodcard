import { FindUnique, FindAuthorMessages } from '@/models/adminMessage/find'
import { Create } from '@/models/adminMessage/create'
import { Delete } from '@/models/adminMessage/delete'

const AdminMessage = {
    find: {
        unique: FindUnique,
        byAuthor: FindAuthorMessages,
    },
    create: Create,
    delete: Delete,
}
export default AdminMessage;