import { Create } from '@/models/profile/create';
import { Update } from '@/models/profile/update';
import { Delete } from '@/models/profile/delete';
import { FindUnique, FindByAuthor, AuthorProfile, FindMany } from '@/models/profile/find';

const ProfileModel = {
    create: Create,
    find: {
        unique: FindUnique,
        many: FindMany,
        authorProfile: AuthorProfile,
        authorProfiles: FindByAuthor,
    },
    update: Update,
    delete: Delete,
}

export default ProfileModel;