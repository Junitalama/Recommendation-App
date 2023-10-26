import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const VideoList = () => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch("https://recommendation-app-wsck.onrender.com")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelected(selectedId);
    const video = list.find((item) => item.rec_id === selectedId);
    setSelectedVideo(video);
  };

  const videoRecommendations = list.filter(
    (recommendation) => recommendation.category === "video"
  );

  return (
    <div>
      <button className="btn btn-info" onClick={() => setShowList(true)}>
        Videos
      </button>
      {showList && (
        <div>
          <FormControl>
            <Select value={selected} onChange={handleSelectChange}>
              {videoRecommendations.map((l) => (
                <MenuItem key={l.rec_id} value={l.rec_id}>
                  {l.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedVideo && (
            <div className="card">
              <img
                className="card-img-top"
                src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpZGVvfGVufDB8fDB8fHww"
                alt="book_pic"
              ></img>

              <div className="card-body">
                <p className="card-title">Title: {selectedVideo.title}</p>
                <p>Category: {selectedVideo.category}</p>
                <p>Recommended by: {selectedVideo.name}</p>
                <p>Genre:{selectedVideo.type}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoList;
