export const fetchPeople = async () => {
  const response = await fetch('https://swapi.co/api/people/');
  if (response.ok) {
    return response.json();
  } else {
    throw Error(`Error fetching, ${response.status}`)
  }
}

