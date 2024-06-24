import React from "react";

// Test deploy: npm run build rồi push lên git là xong

// /user
export default function User(props) {
    console.log(props);
    return (
        <>
            <h1>Hello user1</h1>
            <div>{props.stars}</div>
            <div>Test1{props.title}</div>
            <div>Test</div>
        </>
    )
}

User.getInitialProps = async ({query}) => {
    console.log(query); // Thử với http://localhost:3000/user?title=Awesome
    const res = await fetch('https://api.github.com/repos/vercel/next.js'); // Làm ở phía server
    const json = await res.json()
    return { stars: json.stargazers_count, title: query.title }
}
