import Head from "next/head";
import { useRouter } from 'next/router'

export default function Seo({ title, description, keywords, }: { title: string; description?: string; keywords?: string; }) {
    const { pathname } = useRouter();
    return (
        <Head>
            {title && description && keywords ? (
                <meta name="robots" content="index, follow" />
            ) : (
                <meta name="robots" content="noindex, nofollow" />
            )}
            <title>{pathname === '/' ? title : title + " | " + process.env.NEXT_PUBLIC_APP_NAME}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
        </Head>
    );
}
