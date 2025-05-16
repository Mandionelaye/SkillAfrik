import { useState, useEffect } from "react";
import { db } from "@/src/libs/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const VideoWithComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // Récupérer les commentaires en temps réel
  useEffect(() => {
     if (!videoId) return;
    const q = query(collection(db, "commentaire", videoId, "items"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });

    return () => unsubscribe();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC' // Pour garder l'heure UTC
    });
    // const currentTime = playerRef.current.getCurrentTime();
    const formattedTime = formatter.format(date)

    await addDoc(collection(db, "commentaire", videoId, "items"), {
      name,
      text,
      time: formattedTime,
      createdAt: new Date(),
    });
    setForm(false);
    setText("");
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          required
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Commentaire"
          required
        />
        <button type="submit">Envoyer</button>
      </form> */}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Forum de discussion</h2>
            <button className="text-orange-500 hover:text-orange-600 font-medium cursor-pointer whitespace-nowrap">
              Voir tout <i className="fas fa-chevron-right ml-1"></i>
            </button>
          </div>
        </div>

        <div className="p-4">
            {comments.map((topic) => (
         <div  key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden p-2 fade-in mb-4">
                 <div className="flex justify-between items-start ">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                <i className="fas fa-user text-orange-500"></i>
                            </div>
                            <h3 className="font-medium text-gray-800">{topic.name}</h3>
                        </div>
                        <span className="text-xs text-gray-500">{topic.time}</span>
                    </div>
                    <div className="pl-11">
                        <p className="text-gray-700 whitespace-pre-line">{topic.text}</p>
                        <div className="flex justify-end mt-3 space-x-2">
                            <button className="text-gray-500 hover:text-orange-500 transition">
                                <i className="far fa-thumbs-up"></i>
                            </button>
                        </div>
                    </div>
            </div>

              
            ))}

            {
                !comments.length && (
                    <div class="text-center py-8 text-gray-500" id="emptyState">
                    <i class="fas fa-comment-slash text-4xl mb-3"></i>
                    <p>Aucun commentaire pour le moment. Soyez le premier à poster !</p>
                    </div>
                )
            }


          <button
            onClick={() => setForm(!form)}
            className="w-full mt-4 bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 py-2 px-4 rounded-button cursor-pointer whitespace-nowrap transition-colors"
          >
            Poser une question
          </button>
        </div>
      </div>

      {form && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8 fade-in mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-pen-fancy mr-3 text-orange-500"></i> Nouveau
            commentaire
          </h2>

          <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <div>
              <label
                for="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Votre nom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="Entrez votre nom"
                />
              </div>
            </div>

            <div>
              <label
                for="comment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Votre message
              </label>
              <textarea
                id="comment"
                name="comment"
                onChange={(e) => setText(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                placeholder="Écrivez votre message ici..."
                maxlength="500"
              ></textarea>
              <div className="flex justify-between mt-1">
                <small className="text-xs text-gray-500">
                  Maximum 500 caractères
                </small>
                <small id="charCount" className="text-xs char-count">
                  0/500
                </small>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition flex items-center"
              >
                <i className="fas fa-paper-plane mr-2"></i> Publier
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VideoWithComments;
