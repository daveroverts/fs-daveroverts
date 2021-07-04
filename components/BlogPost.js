import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import Link from 'next/link';

const BlogPost = ({ post }) => {

    return (
        <article className="px-5 py-2 text-center transition border-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">
            <Link href={`/posts/${post.slug}`}>
                <a className="hover:underline">
                    <h4 className="text-xl">{post.title}</h4>
                    <h5 className="text-lg">
                        {format(parseISO(post.date), 'P', { locale: enGB })}
                    </h5>
                </a>
            </Link>
        </article>
    )
}

export default BlogPost;