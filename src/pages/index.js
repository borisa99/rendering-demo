import { useState } from "react";
import { Inter } from "next/font/google";
import Head from "next/head";

import usersData from "@/data/users.json";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [loadedCount, setLoadedCount] = useState(20);

  const loadMore = async () => {
    const start = loadedCount;
    const end = start + 20;
    const newUsers = usersData.slice(start, end);
    setUsers([...users, ...newUsers]);
    setLoadedCount(end);
  };

  const title = "User List - NextJS App";
  const description = "A comprehensive list of users built with NextJS.";
  const website = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://${website}`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${website}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="http://placehold.it/32x32" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={`https://${website}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="http://placehold.it/32x32" />
      </Head>

      <main className={`min-h-screen w-screen p-4 ${inter.className}`}>
        <ul className="flex flex-wrap gap-3 mb-4">
          {users.map(({ _id, name }, index) => (
            <Link key={_id} href={`/${_id}`}>
              <li className="flex border text-sm rounded-sm p-2 cursor-pointer hover:bg-blue-600 hover:text-white border-blue-600 hover:opacity-75 transition-all ease-in-out duration-100">
                <span className="font-semibold mr-1">{index + 1}.</span>
                <h2>{name}</h2>
              </li>
            </Link>
          ))}
        </ul>
        {users.length === loadedCount && (
          <button onClick={loadMore}>Load More</button>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      initialUsers: usersData.slice(0, 20),
    },
  };
}
