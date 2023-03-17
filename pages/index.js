import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ devCode }) {
  const { data: session } = useSession();

  if (session) {
    console.log(session.user);
  }

  return (
    <>
      <Head>
        <title>Gate code App</title>
        <meta name="description" content="Get your gate code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black text-green-800 min-h-screen flex flex-col justify-center items-center  ">
        <div className=" text-4xl font-bold px-4">Welcome to gate code App</div>
        <div className="px-4 my-2">
          To get access to your gate code you will use your github account
        </div>

        <div className="flex flex-col justify-center items-center">
          <div>
            {session ? (
              <img
                className=" w-20 h-20 rounded-full my-2"
                src={`${session?.user?.image}`}
                alt="alt"
              />
            ) : (
              ""
            )}
          </div>
          <div>{session?.user?.name}</div>
        </div>

        <div className="mt-4 bg-green-800 text-black rounded-md py-2 px-6">
          {!session && <button onClick={() => signIn()}>Login </button>}
          {session && <button onClick={() => signOut()}>Logout</button>}
        </div>

        <div className="mt-4 font-bold text-4xl">
          {session ? devCode?.data : "000"}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/gate-code`);
  const devCode = await res.json();

  return { props: { devCode } };
}
