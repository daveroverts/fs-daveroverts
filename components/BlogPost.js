import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";
import Link from 'next/link';
import Image from 'next/image'

const BlogPost = ({ post }) => {
    return (
        <Link href={`/posts/${post.slug}`}>
            <a className="hover:underline">
                <article className={`overflow-hidden group flex flex-col justify-center min-h-full text-center rounded-3xl ${!post.banner ? 'border-2 hover:bg-gray-50 dark:hover:bg-gray-800' : ''}`}>
                    <div className="transition duration-1000 group-hover:scale-105">


                        {post.banner ? (
                            <div className="relative h-64 w-96 xl:w-full xl:h-96">
                                <Image
                                    src={post.banner}
                                    alt={post.title}
                                    layout="fill"
                                    objectFit="fill"
                                    className="transition duration-1000 rounded-3xl"
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
                    </div>
                </article>
            </a>
        </Link>
    )
}

export default BlogPost;
