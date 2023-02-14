import Head from "next/head";

export default function Post({ fetchedData }) {
  console.log(fetchedData.length);
  const data = fetchedData.length > 0 && fetchedData.length < 2 ? fetchedData[0] : false;

  if (!data) return <p>Fehler beim laden der Daten!</p>;

  //console.log(data);
  return (
    <>
      <Head>
        <title>Rezension {data.attributes.companyName}</title>
      </Head>
      <div className="container mx-auto grid grid-cols-3 grid-rows-2 gap-10 mb-52">
        <div className="row-span-2 bg-primary text-primary-100 flex justify-center items-center rounded-full shadow-lg shadow-primary-700">1</div>
        <div className="bg-primary text-primary-100 flex justify-center items-center">2</div>
        <div className="bg-primary text-primary-100 flex justify-center items-center">3</div>
      </div>
      <p className="bg-primary-100 text-primary/50 text-9xl font-bold text-center container mx-auto p-40 shadow-lg shadow-primary/50">{data.attributes.firstName}</p>
      <div className="grid grid-cols-2 hover:grid-cols-6">
        <p>Hallo</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>4</p>
        <p>4</p>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
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
  const res = await fetch(`https://cms.web-craft.design/api/rezensionen?filters[slug][$eq]=${params.slug}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer 89b135e7b3c8f19122eb4fb4711ebda972ef301ad957ee71d3d0b053b51c981de638417cd64b119ccd2a8ea4e2e81226b4ed237d4c096cec01a75aec8207fab56d7949b4ef7b3c9fdda999e3b9418040145498866e6c612f783b98a83ce3f07ad1491017f08aa740106cfdbe7bbd868ad132135bd80d1c583b46b9e6921cb22f",
    },
  });
  const result = await res.json();
  const data = result.data;

  // Pass post data to the page via props
  return { props: { fetchedData: data } };
}
