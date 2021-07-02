import Link from 'next/link'
import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";

const BlogPost = ({ post }) => {

    return (
        <div className="px-5 text-center border-2 rounded-full gray-300 hover:bg-gray-50">
        <Link href={`/posts/${post.slug}`}>
            <a className="hover:underline">
                <h5 className="text-xl">{post.title}</h5>
                <h5 className="text-lg">
                {format(parseISO(post.date), 'P', { locale: enGB })}
                </h5>
            </a>
        </Link>
        </div>
    )
}

export default BlogPost;