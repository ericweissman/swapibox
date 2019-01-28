export const fetchData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching, ${response.status}`)
  }
}


