export async function getLatLng(
    street: string,
    neighborhood: string,
    number: number,
    city: string,
    state: string
)
    : Promise<{ lat: number, lng: number }> {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${neighborhood}+${number}+${city}+${state},+CA&key=${import.meta.env.VITE_API_GEOCODING_GOOGLE_KEY}`)
    const data = await res.json()
    return data.results[0].geometry.location
}
