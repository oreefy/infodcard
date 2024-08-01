import { Console } from '@/middleware/http';
import { ContactType, ContactSelect, ContactReturn } from '@/models/contact/type';
import { prisma } from '@/db-config';

interface ContactCreateType {
    name: string;
    number: string;
    email: string;
    subject: string;
    message: string;
}

export async function Create(data: ContactCreateType, fields?: string): Promise<ContactType | null> {
    try {
        const sanitised = {
            name: data.name,
            number: data.number,
            email: data.email,
            subject: data.subject,
            message: data.message
        };
        const create = await prisma.contact.create({
            data: sanitised,
            select: ContactSelect(fields)
        })
        if (create) {
            return ContactReturn(create, fields);
        } else {
            return null;
        }
    } catch (error: any) {
        Console(error.message);
        return null;
    }
}