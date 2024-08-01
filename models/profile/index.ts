import { Create } from '@/models/profile/create';
import { Update } from '@/models/profile/update';
import { Delete } from '@/models/profile/delete';
import { FindUnique, FindByAuthor, AuthorProfile } from '@/models/profile/find';

const ProfileModel = {
    create: Create,
    find: {
        unique: FindUnique,
        authorProfile: AuthorProfile,
        authorProfiles: FindByAuthor,
    },
    update: Update,
    delete: Delete,
}

export default ProfileModel;