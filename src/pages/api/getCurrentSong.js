export async function get() {
  try {
    const response = await fetch('http://82.25.92.57:5000/status.json');
    const data = await response.json();
    
    if (data && data.title) {
      return new Response(JSON.stringify({
        title: data.title
      }));
    }
  } catch (error) {
    console.error("Error fetching stream data:", error);
  }
  
  // Si no se pudo obtener datos, devolver mensaje informativo
  return new Response(JSON.stringify({
    title: "Transmitiendo en vivo - Radio Volketa Interestelar"
  }));
}
