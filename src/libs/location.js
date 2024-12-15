// Fungsi menghitung jarak
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Radius bumi dalam meter
    const φ1 = (lat1 * Math.PI) / 180; // Konversi latitude ke radian
    const φ2 = (lat2 * Math.PI) / 180; // Konversi latitude ke radian
    const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Perbedaan latitude
    const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Perbedaan longitude

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const r = R * c; // Jarak dalam meter
    const distance = Math.round(r);
    return distance;
}

// Fungsi untuk mengecek lokasi
export function checkLocation() {
    const allowedLatitude = -7.313873; // Koordinat area yang diizinkan
    const allowedLongitude = 112.731657;
    const allowedRadius = 300000; // Radius dalam meter (harus positif)

    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLatitude = position.coords.latitude;
                    const userLongitude = position.coords.longitude;


                    const distance = calculateDistance(
                        userLatitude,
                        userLongitude,
                        allowedLatitude,
                        allowedLongitude
                    );

                    // Pengecekan lokasi
                    if (distance <= allowedRadius) {
                        resolve(true); // Lokasi valid
                    } else {
                        resolve(false); // Lokasi tidak valid
                    }
                },
                (error) => {
                    console.error("Error Geolocation:", error);
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Akurasi tinggi
            );
        } else {
            reject(new Error("Geolocation tidak didukung oleh browser ini."));
        }
    });
}
