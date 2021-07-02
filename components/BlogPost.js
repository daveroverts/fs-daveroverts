import Link from 'next/link'

const BlogPost = ({ post }) => {

    return (
        <Link href={`/posts/${post.slug}`}>
            <a className="hover:underline">
            <h5 className="text-xl">{post.title}</h5>
            <h5 className="text-lg">{post.date}</h5>
            </a>
        </Link>
    )
}

export default BlogPost;