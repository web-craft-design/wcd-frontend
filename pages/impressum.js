import { getData } from "@/utils/db-queries/getData";
import Head from "next/head";

import styles from "@/styles/impressum.module.scss";

export default function Impressum({ fetchedData }) {
  console.log(fetchedData);
  return (
    <>
      <Head>
        <title>Impressum | web-craft.design</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={`min-h-[60vh] container py-10 lg:py-20`}>
        <h1 className="text-5xl mb-10">Impressum</h1>

        <table className={`${styles.table} table-auto`}>
          <tbody>
            <tr>
              <th>Firma</th>
              <td>{fetchedData.attributes.companyName}</td>
            </tr>
            <tr>
              <th>Rechtsform</th>
              <td>{fetchedData.attributes.legalForm}</td>
            </tr>
            <tr>
              <th>Firmenbuch</th>
              <td>{fetchedData.attributes.companyRegister}</td>
            </tr>
            <tr>
              <th>UID-Nummer</th>
              <td>{fetchedData.attributes.vatNumber}</td>
            </tr>
            <tr>
              <th>Anschrift</th>
              <td>
                {fetchedData.attributes.companyStreet}, {fetchedData.attributes.companyZip} {fetchedData.attributes.companyCity}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

// This also gets called at build time
export async function getStaticProps() {
  //const data = await getDataBySlug("/rezensionen", params.slug);
  const data = await getData("/general-information?populate=deep");

  //console.log(data);
  // Pass post data to the page via props
  return { props: { fetchedData: data } };
}
