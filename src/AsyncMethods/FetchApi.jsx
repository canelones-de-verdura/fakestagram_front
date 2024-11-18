export async function FetchApi() {
    try {
      let response = await fetch("http://localhost:3001/api/games");
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
}