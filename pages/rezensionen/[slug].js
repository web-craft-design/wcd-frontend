import Head from "next/head";
import moment from "moment";
import Link from "next/link";
import { getData } from "@/utils/db-queries/getData";
import { getDataBySlug } from "../../utils/db-queries/getData";

export default function Post({ fetchedData, nextPost, previousPost }) {
  const data = fetchedData;

  const rating = [...new Array(5)].map((star, index) => {
    return index < data.attributes.rating ? <i key={index} className="bi bi-star-fill text-primary text-5xl mr-3"></i> : <i className="bi bi-star"></i>;
  });
  //console.log(data);
  return (
    <>
      <Head>
        <title>Rezension {data.attributes.companyName}</title>
      </Head>
      <div className="p-10 bg-primary-100 text-primary-300 container m-auto shadow-lg shadow-primary/50">
        <div className="mb-10 flex flex-col">
          <div className="flex self-end -mb-10">{rating}</div>
          <p>Datum: {moment(data.attributes.reviewDate).format("DD.MM.Y")}</p>
          <p className="text-2xl">
            {data.attributes.firstName} {data.attributes.lastName} aus {data.attributes.city}{" "}
          </p>
          <p className="font-bold">{data.attributes.companyName}</p>
        </div>

        <div className="p-20 bg-primary-900 text-primary-100 text-center mb-10 rounded-lg">{data.attributes.content}</div>

        <div className={`${previousPost && nextPost ? "flex justify-between" : ""} ${!previousPost && nextPost ? "w-full text-end" : ""}`}>
          {previousPost && (
            <Link href={previousPost}>
              <i className="bi bi-arrow-left mr-3"></i>
              <span>Vorherige Rezension anzeigen</span>
            </Link>
          )}
          {nextPost && (
            <Link href={nextPost} className="text-end">
              <span>Nächste Rezension anzeigen</span>
              <i className="bi bi-arrow-right ml-3"></i>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const data = await getData("/rezensionen");

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { slug: post.attributes.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const data = await getDataBySlug("/rezensionen", params.slug);
  var previousPost = false;
  var nextPost = false;

  const previousPostsSlug = await getData(`/rezensionen/${Number(data.id) - 1}`);
  const nextPostsSlug = await getData(`/rezensionen/${Number(data.id) + 1}`);

  if (previousPostsSlug) previousPost = `/rezensionen/${previousPostsSlug.attributes.slug}`;
  if (nextPostsSlug) nextPost = `/rezensionen/${nextPostsSlug.attributes.slug}`;

  // Pass post data to the page via props
  return { props: { fetchedData: data, nextPost, previousPost } };
}
