export async function initializeMapKit() {
  return new Promise<void>((resolve, reject) => {
    try {
      mapkit.init({
        authorizationCallback: (done) => {
          // Replace with your MapKit JS token
          done(import.meta.env.VITE_MAPKIT_TOKEN);
        },
        language: "en"
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}