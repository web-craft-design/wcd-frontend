export async function getSlugOfPreviousItem(api, currentID) {
  const res = await fetch(`${api}/${currentID - 1}`);

  if (!res.ok) {
    return false;
  }
  const result = await res.json();
  const data = result.data;

  return data.attributes.slug;
}
