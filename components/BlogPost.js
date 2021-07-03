import Link from 'next/link'
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";

const BlogPost = ({ post }) => {

    return (
        <article className="px-5 text-center transition border-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700">
        <Link href={`/posts/${post.slug}`}>
            <a className="hover:underline">
                <h5 className="text-xl">{post.title}</h5>
                <h5 className="text-lg">
                {format(parseISO(post.date), 'P', { locale: enGB })}
                </h5>
            </a>
        </Link>
        </article>
    )
}

export default BlogPost;