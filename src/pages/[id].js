import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import ErrorPage from "next/error";

import users from "@/data/users.json";

export default function UserPage({ user }) {
  const router = useRouter();
  const title = `${user.name} | User Profile`;
  const description = `Details about ${user.name} - ${user.about}`;
  const website = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN;

  if (!router.isFallback && !user) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="p-8">
      <Head>
        {/* General */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://${website}${router.asPath}`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://${website}${router.asPath}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={user.picture} />
        <meta property="og:image:alt" content={`Image of ${user.name}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={`https://${website}${router.asPath}`}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={user.picture} />
        <meta name="twitter:image:alt" content={`Image of ${user.name}`} />
      </Head>

      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Image
              src={user.picture}
              alt={user.name}
              width={128}
              height={128}
              className="rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl mb-2">{user.name}</h1>
              <p className="text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>About:</strong> {user.about}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Address:</strong> {user.address}
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl mb-2">Friends</h2>
            <ul>
              {user.friends.map((friend) => (
                <li key={friend.id} className="text-gray-600">
                  {friend.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Greeting:</strong> {user.greeting}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Favorite Fruit:</strong> {user.favoriteFruit}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  // API Call to get all player IDs
  const paths = users.map((user) => ({
    params: { id: user._id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  // GET Player data based on ID 
  const user = users.find((u) => u._id === params.id);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
    revalidate: 60,
  };
}
