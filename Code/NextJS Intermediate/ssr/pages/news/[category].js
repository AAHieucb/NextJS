// # SSR của NextJS / Dùng getServerSideProps

import { useRouter } from "next/router";

function ArticleListByCategory({articles, category}) {
    const router = useRouter()
    console.log(router.query.category)

    return(
        <>
            <h1>
                Category: {category}
            </h1>
            {
                articles.map(article => {
                    return(
                        <div key={article.id}>
                            <h2>
                                {article.id} { articles.title}
                            </h2>
                            <p>{article.description}</p>
                            <hr/>
                        </div>
                    )
                })
            }
        </>
    );
};

export default ArticleListByCategory;

export async function getServerSideProps(context) {
    const { params, req, res, query } = context;
    const response = await fetch(`http://localhost:4000/news?category=${params.category}`);
    const data = await response.json();

    // Dùng cookie, y hệt nodejs server bth
    console.log(req.headers.cookie);
    res.setHeader("Set-Cookie", ['name=hieu']);

    // VD ở link này: localhost"3000/news/Sports?subcat=test => thì query nó bắt cả {category: "Sports", subcat: "test"}
    console.log(query);

    return{
        props: {
            articles: data,
            category: params.category,
        }
    }
}