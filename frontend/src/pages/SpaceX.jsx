import { useEffect, useState } from "react";
import { getSpaceXData } from "../api/spaceXApi";
import Navbar from "../components/Navbar";

const SpaceX = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSpaceXData()
      .then((data) => {
        setLaunches(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="stars" />
      <div className="p-6 text-white min-h-screen">
        <h2 className="text-4xl font-bold text-center mb-8 text-cyan-300 drop-shadow-lg">
          SpaceX Launch Missions
        </h2>

        {loading && <p className="text-center text-xl">Loading SpaceX data...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {
  launches.map((launch) => (
    <div
      key={launch.id}
      className="bg-white/10 backdrop-blur-md border border-cyan-500 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <h3 className="text-xl font-semibold text-cyan-200 mb-2">{launch.mission_name}</h3>
      <p className="text-sm">🚀 Rocket: <span className="text-white">{launch.rocket_name}</span></p>
      <p className="text-sm">📅 Year: <span className="text-white">{launch.launch_year}</span></p>
      <p className="text-sm">📍 Launchpad: <span className="text-white">{launch.launchpad_name}</span></p>
      <p className="text-sm">👨‍🚀 Crew: <span className="text-white">{launch.crew_members.join(", ") || "None"}</span></p>
      <p className="text-sm">📦 Payloads: <span className="text-white">{launch.payload_names.join(", ")}</span></p>
      <p className="text-sm">✅ Success: <span className="text-white">{launch.success ? "Yes" : "No"}</span></p>
      {launch.details && <p className="text-sm mt-2 text-gray-300">{launch.details}</p>}
      {launch.links?.patch?.small && (
        <img src={launch.links.patch.small} alt="Patch" className="w-16 mt-2" />
      )}
      {launch.links?.webcast && (
        <a href={launch.links.webcast} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline mt-2 block">🎥 Webcast</a>
      )}
    </div>
  ))
}

        </div>
      </div>
    </>
  );
};

export default SpaceX;
