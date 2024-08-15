import { Create } from "@/models/contact/create";
import { Delete } from "@/models/contact/delete";
import { FindMany } from "@/models/contact/find";

const ContactModel = {
    create: Create,
    delete: Delete,
    find: {
        many: FindMany,
    }
}
export default ContactModel;