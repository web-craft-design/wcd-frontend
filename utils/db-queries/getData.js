export const baseURL = "https://cms.web-craft.design";
const api = baseURL + "/api";

export async function getData(endpoint) {
  const res = await fetch(api + endpoint);

  console.log(api + endpoint);
  //console.log(res);
  if (!res.ok) {
    return false;
  }

  const result = await res.json();

  if (result.data.length == 1) return result.data[0];

  return result.data;
}

export async function getDataBySlug(endpoint, slug) {
  return await getData(endpoint + `?filters[slug][$eq]=${slug}&populate=deep`);
}
