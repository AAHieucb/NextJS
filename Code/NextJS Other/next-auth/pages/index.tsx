import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // Trang này buộc phải login mới hiện
  const { data: session, status } = useSession();
  if (status === "loading") {
    return "Loading or not authenticated..."
  }
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      {session && session.user && (<button onClick={() => signOut()}>Sign out as {session.user.name}</button>)}
      {status == "authenticated" && (<Image alt="" src={session?.user?.image ?? ""} width={100} height={100}></Image>)}
      <button onClick={() => signIn()}>Sign in choose options</button>
      <button onClick={() => signIn("google")}>Sign in only google</button>
      {/* Callback url phải có cùng hostname với google console, k thể redirect sang web khác */}
      <button onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/"})}>Sign in with callback</button> 
    </div>
  );
}

// // Láy csrf token ở server
// export async function getServerSideProps() {
//   var x = await getCsrfToken();
//   console.log("x::", x);
//   return {
//     props: {
//       csrfToken: x
//     },
//   };
// }