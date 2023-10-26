import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const MovieList = () => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    const movie = list.find((item) => item.rec_id === selectedId);
    setSelectedMovie(movie);
  };

  const movieRecommendations = list.filter(
    (recommendation) => recommendation.category === "movie"
  );

  return (
    <div>
      <button className="btn btn-info" onClick={() => setShowList(true)}>
        Movies
      </button>
      {showList && (
        <div>
          <FormControl>
            <Select value={selected} onChange={handleSelectChange}>
              {movieRecommendations.map((l) => (
                <MenuItem key={l.rec_id} value={l.rec_id}>
                  {l.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedMovie && (
            <div className="card">
              <img
                className="card-img-top"
                src="https://static.vecteezy.com/system/resources/previews/005/502/524/original/cinema-background-concept-movie-theater-object-on-red-curtain-background-and-movie-time-with-electric-bulbs-frame-illustration-free-vector.jpg"
                alt="movie_pic"
              ></img>
              <div className="card-body">
                <p className="card-title">Title: {selectedMovie.title}</p>
                <p>Category: {selectedMovie.category}</p>
                <p>Recommended by: {selectedMovie.name}</p>
                <p>Genre:{selectedMovie.type}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;
