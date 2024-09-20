// # SSR của NextJS

import Link from "next/link";
import { useQuery } from "react-query";

function NewsArticleList(props) {
    console.log("Tét");
    const articles = useQuery("test", getData, {
        cacheTime: 1,
        initialData: props.articles,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    return(
        <>
            <Link href="/">Navigate</Link>
            <h1>List of News Article</h1>
            {
                articles.data.map(article => {
                    return (
                        <div key={article.id}>
                            <h2>
                                {article.id} {article.title} | {article.category}
                            </h2>
                        </div>
                    )
                })
            }
        </>
    );
};

export default NewsArticleList;

const getData = async () => {
    // const response = await fetch("http://localhost:4000/news");
    // const data = await response.json();
    const data = [];
    console.log("UUU");
    return data;
}

export async function getServerSideProps() {
    await new Promise((resolve) => setTimeout(() => resolve(), 2000));
    const data = await getData();
    console.log("AAA", data);
    return{
        props: {
            articles: data,
        }
    }
}