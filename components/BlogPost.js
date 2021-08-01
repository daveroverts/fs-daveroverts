import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import Link from 'next/link';
import Image from 'next/image'

const BlogPost = ({ post, index }) => {
    return (
        <Link href={`/posts/${post.slug}`}>
            <a className="hover:underline">
                <article className={`transform hover:scale-105 flex flex-col justify-center min-h-full text-center transition rounded-3xl ${!post.banner ? 'border-2 hover:bg-gray-50 dark:hover:bg-gray-800' : ''} ${index % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}>
                    {post.banner ? (
                        <div className="relative h-64 w-96 xl:w-full xl:h-96">
                            <Image
                                src={post.banner}
                                alt={post.title}
                                layout="fill"
                                objectFit="fill"
                                className="rounded-3xl"
                                placeholder="blur"
                                blurDataURL={post.base64}
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
                </article>
            </a>
        </Link>
    )
}

export default BlogPost;
