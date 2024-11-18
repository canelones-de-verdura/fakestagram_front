export async function PostData(data) {
    try {
      const response = await fetch('http://localhost:3001/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      return response.ok ? await response.json() : Promise.reject('Error ' + response.statusText);
    } catch (error) {
      console.error('No se pudo agregar el deporte:', error);
    }
  }
  