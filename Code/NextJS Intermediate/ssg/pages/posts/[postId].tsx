import { useRouter } from 'next/router'
import { GetStaticPaths } from 'next'
import ErrorPage from 'next/error'

// # SSR của NextJS / Dùng getStaticProps

function Post({ post }: any) {
    const router = useRouter()
    console.log(post);
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    if (!router.isFallback && !post) {
        return <ErrorPage statusCode={404}/>
    }
    return (
        <>
            <h2>
                {post.id} {post.title}
            </h2>
            <p>{post.body}</p>
        </>
    )
}
export default Post

export async function getStaticProps(context: any) {
    console.log("Trigger revalidate");
    const { params } = context
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}`
    )
    const data = await response.json()
    
    if (!data.id) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post: data
        },
        revalidate: 30,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    // fetch tất cả, dùng fallback: false
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json();
    // const paths = data.map((post: any) => {
    //     return {
    //         params: { postId: `${post.id}` }
    //     }
    // })

    // fetch 1 phần thôi, phần còn lại là loading, fallback: true
    const paths = [
        {params: {postId: "1"}},
        {params: {postId: "2"}},
        {params: {postId: "3"}},
    ];
    return {
        paths: paths,
        fallback: true
    }
}