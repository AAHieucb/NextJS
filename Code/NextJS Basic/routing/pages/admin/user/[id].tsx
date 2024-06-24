import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Link from "next/link"
import { useEffect } from 'react'

// # Package next có sẵn khác / next/head
// # Routing / Dùng next/router / Chuyển trang / Dùng file [param]

export default function Login() {
    const router = useRouter()
    const { id } = router.query

    console.log(id);
    // Render 2 lần, lần đầu bị undefined. Vì mặc định dùng CSR thì browser request sẽ gửi lại ngay 1 trang tĩnh với data k có gì. Sau đó client 
    // browser sẽ tự lấy id và gán vào đây rồi rerender. Khi làm SSR, ta phải xử lý sẵn điều đó ở server r mới trả lại client html có giá trị id rồi

    useEffect(() => {
        router.prefetch("/login");
    })

    const goToLogin = () => {
        router.push("/login");
    }

    return(
        <>
            <Head>
                <title>{`User ${id}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100&display=swap" rel="stylesheet"/>
            </Head>
            <h1 style={{fontFamily: "Roboto Mono"}}>User Page</h1>

            <button onClick={goToLogin}>Go to login SCR</button><br/>
            <a href="/login">Reload lại sang login</a><br/>
            <Link href="/login">Go to login CSR</Link><br/>

            {/* Khi k dùng hook */}
            <div onClick={() => {
                Router.push({
                    pathname: '/admin/user/20',
                    query: { id: 1 },
                })
            }}>User 20!</div>

            {/* Có thể viết href dạng object */}
            <Link href={{ pathname: '/admin/user', query: {id: '2'} }} as="/admin/user/2" prefetch={false}>
                Go to user/id2
            </Link><br/>

            {/* Legacy */}
            {/* Gõ vào /admin/user?id=1 vẫn ra /admin/user/1, ngày xưa dùng lồng thẻ a */}
            <Link href="/admin/user?id=1" as="/admin/user/1" legacyBehavior>
                <a>Go to user/id1</a>
            </Link>
        </>
    )
}