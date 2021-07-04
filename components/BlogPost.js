import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import Link from 'next/link';
import Image from 'next/image'

const BlogPost = ({ post }) => {
    return (
        <article className="flex flex-col justify-center min-h-full text-center transition border-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">
            <Link href={`/posts/${post.slug}`}>
                <a className="hover:underline">
                    {post.banner ? (
                        <div className="relative w-full h-80">
                            <Image
                                src={post.banner}
                                alt={post.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                    ) : (
                        <>
                            <h4 className="text-xl">{post.title}</h4>
                            <h5 className="text-lg">
                                {format(parseISO(post.date), 'P', { locale: enGB })}
                            </h5>
                        </>
                    )}
                </a>
            </Link>
        </article>
    )
}

export default BlogPost;
