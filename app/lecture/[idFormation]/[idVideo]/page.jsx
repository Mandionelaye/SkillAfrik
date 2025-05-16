"use client";
import AdBanner from "@/src/components/AdSense/AdBanner";
import FooterComponent from "@/src/components/footer/FooterComponent";
import HeaderComponet from "@/src/components/header/HeaderComponet";
import DescripionComp from "@/src/components/Youtub/DescripionComp";
import VideoWithComments from "@/src/components/Youtub/VideoWithComments ";
import { getPlaylistItems } from "@/src/libs/youtubData";
import Link from "next/link";
import Script from "next/script";
import { use, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function ListeVideoPage({ params }) {
  const [videos, setVideos] = useState([]);
  const { idFormation, idVideo } = use(params);
  const idFormations = decodeURIComponent(idFormation);
  const idVideos = decodeURIComponent(idVideo);
  const query = idFormations.replace(/-/g, " ");


  const [currentVideo, setCurrentVideo] = useState(0);
  const [watchedVideos, setWatchedVideos] = useState([]);

  const title = `${query} - Apprentissage en ligne - SkillAfrik`;
  const description = `Suis la formation ${query} en vidéo. Accessible aux jeunes, étudiants, et apprentis même sans connexion permanente.`;

  const fetcheData = async () => {
    await getPlaylistItems(idVideos)
      .then((data) => {
        console.log(data);
        setVideos(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetcheData();
  }, []);

  const toggleWatched = (videoId) => {
    if (watchedVideos.includes(videoId)) {
      setWatchedVideos(watchedVideos.filter((id) => id !== videoId));
    } else {
      setWatchedVideos([...watchedVideos, videoId]);
    }
  };

  const progressPercentage = Math.round(
    (watchedVideos.length / videos?.length) * 100
  );
  const isCertificateAvailable = watchedVideos.length === videos?.length;

  const handleEnded = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    } else {
      console.log("Playlist terminée");
      setCurrentVideo(0);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900">
       <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": query,
            "description": description,
            "provider": {
              "@type": "Organization",
              "name": "SkillAfrik",
              "url": "https://skillafrik-seven.vercel.app/lecture/"+idFormations+"/"+idVideos
            }
          }),
        }}
      />
      <HeaderComponet />
      {/* Course Banner */}
      <main>
        <div className="container mx-auto mt-16 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link
              href={`/formation/${idFormations}`}
              className="text-gray-700 hover:text-orange-500 cursor-pointer"
            >
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div className="text-sm text-gray-600">
              <span>Accueil</span> / <span>Formations</span> /{" "}
              <span className="text-orange-500">{query}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Video Player and Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                {/* Video Player */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-900">
                  {/* <img
                  src={videoss[currentVideo].thumbnail}
                  alt={videoss[currentVideo].title}
                  className="w-full h-full object-cover"
                /> */}
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videos[currentVideo]?.snippet.resourceId.videoId}`}
                    controls
                    width="100%"
                    height="360px"
                    className="w-full h-full object-cover"
                    playing
                    onEnded={handleEnded}
                  />
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-orange-600 transition-colors">
                    <i className="fas fa-play text-xl"></i>
                  </button>
                </div> */}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {videos[currentVideo]?.snippet.title}
                      </h2>
                      <p>{videos[currentVideo]?.snippet.channelTitle}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <button
                        className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-button cursor-pointer whitespace-nowrap transition-colors"
                        onClick={() => toggleWatched(videos[currentVideo].id)}
                      >
                        <i
                          className={`fas ${
                            watchedVideos?.includes(videos[currentVideo]?.id)
                              ? "fa-check-square text-green-600"
                              : "fa-square"
                          }`}
                        ></i>
                        <span>Marquer comme vu</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <DescripionComp
                      text={videos[currentVideo]?.snippet.description}
                    />
                  </div>
                </div>
              </div>

              {/* Forum Preview */}
              <VideoWithComments
                videoId={videos[currentVideo]?.snippet?.resourceId?.videoId}
              />
            </div>

            {/* Sidebar - Playlist and Progress */}
            <section className="lg:col-span-1">
              {/* Playlist */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">
                    Playlist de la formation
                  </h2>
                </div>

                <div className="p-2 max-h-[500px] overflow-y-auto">
                  <ul className="divide-y divide-gray-100">
                    {videos?.map((video, index) => (
                      <li
                        key={video.id}
                        className={`p-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                          currentVideo === index ? "bg-orange-50" : ""
                        }`}
                        onClick={() => setCurrentVideo(index)}
                      >
                        <div className="flex space-x-3">
                          <div className="relative w-24 h-16 flex-shrink-0">
                            <img
                              src={video.snippet.thumbnails.medium?.url}
                              alt={"img"}
                              className="w-full h-full object-cover rounded"
                            />
                            {/* <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div> */}
                            {currentVideo === index && (
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <i className="fas fa-play text-white"></i>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <h3 className="font-medium text-sm line-clamp-2">
                              {video.snippet.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <h4 className="text-sm text-gray-500 hover:text-orange-500 cursor-pointer">
                                {video.snippet.channelTitle}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress and Certificate */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Votre progression</h2>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Progression globale
                      </span>
                      <span className="text-sm font-medium">
                        {progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-orange-500 h-2.5 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      {isCertificateAvailable
                        ? "Félicitations ! Vous avez terminé tous les modules de cette formation."
                        : `Terminez tous les modules pour obtenir votre certificat (${watchedVideos.length}/${videos.length} complétés)`}
                    </p>

                    <button
                      className={`w-full py-3 px-4 rounded-button whitespace-nowrap ${
                        isCertificateAvailable
                          ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!isCertificateAvailable}
                    >
                      <i className="fas fa-certificate mr-2"></i>
                      Obtenir mon certificat
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* <AdBanner /> */}
      </main>
      <FooterComponent />
    </div>
  );
}
