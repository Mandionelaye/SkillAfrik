import { openDB } from 'idb';
import { db } from '@/src/libs/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const API_KEYS = [
    "AIzaSyA3kaoYCsHlUMALPN0VfSiK22wfEKBl0JU", // Remplace avec ta vraie clé
    "AIzaSyCG8KoFmx54AFkDVj6Fxn5_QozdgLLqwmg"
];
const apiUrlV3 = 'https://www.googleapis.com/youtube/v3';

async function getDB() {
    return await openDB('youtube-cache', 1, {
        upgrade(dbs) {
            if (!dbs.objectStoreNames.contains('videos')) {
                dbs.createObjectStore('videos');
            }
            if (!dbs.objectStoreNames.contains('playListe')) {
                dbs.createObjectStore('playListe');
            }
        }
    });
}


/**
 * 🔍 Recherche de vidéos
 */
export const searchVideos = async (query) => {
    for (let key of API_KEYS) {
        try {
            const url = `${apiUrlV3}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${key}`;

            const response = await fetch(url);

            const data = await response.json();

            if (data.error) {
                if (data.error.errors[0].reason === "quotaExceeded") {
                    console.warn(`Quota dépassé pour la clé : ${key}. On essaie la suivante...`);
                    continue; // essaie la prochaine clé
                } else {
                    throw new Error(data.error.message);
                }
            }

            return data.items; // succès
        } catch (error) {
            console.error("Erreur avec la clé", key, ":", error.message);
        }
    }
};

/**
 * 🔎 Recherche de playlists
 */
export const searchPlaylists = async (query) => {

    const dbLocal = await getDB();

    // Vérifier si le résultat est déjà en cache
    const cached = await dbLocal.get('playListe', query);
    if (cached) {
        console.log(`✅ Résultat trouvé en cache pour: ${query}`);
        return cached;
    }

    // Étape 2 : vérifier dans Firebase
    const docRef = doc(db, "playListe", query);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data().items;
        console.log("☁️ Firebase:", query);
        // Stocker aussi en local pour la prochaine fois
        await dbLocal.put('playListe', data, query);
        return data;
    }

    for (let key of API_KEYS) {
        try {
            const url = `${apiUrlV3}/search?part=snippet&q=${encodeURIComponent(query)}&type=playlist&maxResults=6&key=${key}`;

            const response = await fetch(url);

            const data = await response.json();

            if (data.error) {
                if (data.error.errors[0].reason === "quotaExceeded") {
                    console.warn(`Quota dépassé pour la clé : ${key}. On essaie la suivante...`);
                    continue; // essaie la prochaine clé
                } else {
                    throw new Error(data.error.message);
                }
            }

            // Sauvegarde dans IDB et Firebase
            await dbLocal.put('playListe', data.items, query);
            await setDoc(doc(db, "playListe", query), { items: data.items });

            return data.items; // succès
        } catch (error) {
            console.error("Erreur avec la clé", key, ":", error.message);
        }
    }
};

/**
 * 📺 Obtenir les vidéos d'une playlist
 */
export const getPlaylistItems = async (playlistId) => {

    const dbLocal = await getDB();

    // Vérifier si le résultat est déjà en cache
    const cached = await dbLocal.get('videos', playlistId);
    if (cached) {
        console.log(`✅ Résultat trouvé en cache pour: ${playlistId}`);
        return cached;
    }


    // Étape 2 : vérifier dans Firebase
    const docRef = doc(db, "videos", playlistId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data().items;
        console.log("☁️ Firebase:", playlistId);
        // Stocker aussi en local pour la prochaine fois
        await dbLocal.put('videos', data, playlistId);
        return data;
    }


    for (let key of API_KEYS) {
        try {
            const url = `${apiUrlV3}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${key}`;

            const response = await fetch(url);

            const data = await response.json();

            if (data.error) {
                if (data.error.errors[0].reason === "quotaExceeded") {
                    console.warn(`Quota dépassé pour la clé : ${key}. On essaie la suivante...`);
                    continue; // essaie la prochaine clé
                } else {
                    throw new Error(data.error.message);
                }
            }

            // Stocker dans le cache
            await dbLocal.put('videos', data.items, playlistId);
            await setDoc(doc(db, "videos", playlistId), { items: data.items });
            console.log(`💾 Résultat stocké en cache pour: ${playlistId}`);

            return data.items; // succès
        } catch (error) {
            console.error("Erreur avec la clé", key, ":", error.message);
        }
    }
};
