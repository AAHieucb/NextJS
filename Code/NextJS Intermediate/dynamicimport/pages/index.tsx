import Head from 'next/head'

// # Style
import styles from '../styles/Home.module.scss'

function Home(props: any) {
  console.log(styles.primaryColor); // biến global styles

  console.log(props);
  const title = `Create Next App ${props.stars}`
  return (
    <div className={styles.container}>
      <Head>
        {/* <title>Create Next App {"props.stars"}</title> */}
        <title>{title}</title>
      </Head>
      <div>{props.title}</div>
    </div>
  )
}

// # SSR của NextJS / Dùng getInitialProps
// VD nếu k dùng ở đây thì lấy queryParams thì html gửi cho client sẽ bị trống và client phải tự lấy data fill vào và ctrl+U crawler sẽ thấy k có data
Home.getInitialProps = async ({query}: any) => {
  console.log(query); // Thử với http://localhost:3000/?title=Awesome&desc=Content
  const res = await fetch('https://api.github.com/repos/vercel/next.js'); // Làm ở phía server
  const json = await res.json()
  return { stars: json.stargazers_count, title: query.title }
}

export default Home;