import { Roboto } from '@next/font/google'
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from '@/components/Layout';

// Dùng next/font
const roboto = Roboto({
  weight: "400"
});

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_TEST);
  return (
    <main className={roboto.className}> 
      {/* # Setup project NextJS */}
      {/* Thực tế chả ai dùng Layout như này mà trong next có file _document.tsx nên custom lại là được */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
};
