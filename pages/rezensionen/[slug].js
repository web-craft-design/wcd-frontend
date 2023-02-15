import Head from "next/head";
import moment from "moment";
import Link from "next/link";
import { getSlugOfNextItem } from "@/utils/db-helper/getSlugOfNextItem";
import { getSlugOfPreviousItem } from "@/utils/db-helper/getSlugOfPreviousItem";
import { useEffect, useState } from "react";

export default function Post({ fetchedData }) {
  const data = fetchedData.length > 0 && fetchedData.length < 2 ? fetchedData[0] : false;
  const [nextSlug, setNextSlug] = useState("");
  const [previousSlug, setPreviousSlug] = useState("");

  useEffect(() => {
    if (!data) return <p>Fehler beim laden der Daten!</p>;

    async function getSlugs() {
      const slug = await getSlugOfNextItem("https://cms.web-craft.design/api/rezensionen", data.id);
      if (slug) setNextSlug(`/rezensionen/${slug}`);

      const previousSlug = await getSlugOfPreviousItem("https://cms.web-craft.design/api/rezensionen", data.id);
      if (previousSlug) setPreviousSlug(`/rezensionen/${previousSlug}`);
    }

    getSlugs();
  }, [data.id]);

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

        <div className={`${previousSlug && nextSlug ? "flex justify-between" : ""} ${!previousSlug && nextSlug ? "w-full text-end" : ""}`}>
          {previousSlug && (
            <Link href={previousSlug}>
              <i className="bi bi-arrow-left mr-3"></i>

              <span>Vorherige Rezension anzeigen</span>
            </Link>
          )}

          {nextSlug && (
            <Link href={nextSlug} className="text-end">
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
  const res = await fetch("https://cms.web-craft.design/api/rezensionen");
  const results = await res.json();
  // Get the paths we want to pre-render based on posts
  const paths = results.data.map((post) => ({
    params: { slug: post.attributes.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const res = await fetch(`https://cms.web-craft.design/api/rezensionen?filters[slug][$eq]=${params.slug}`);
  const result = await res.json();
  const data = result.data;

  // Pass post data to the page via props
  return { props: { fetchedData: data } };
}
