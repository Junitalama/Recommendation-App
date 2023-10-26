import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const MovieList = () => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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
    const book = list.find((item) => item.rec_id === selectedId);
    setSelectedBook(book);
  };

  const bookRecommendations = list.filter(
    (recommendation) => recommendation.category === "book"
  );

  return (
    <div>
      <button className="btn btn-info" onClick={() => setShowList(true)}>
        Books
      </button>
      {showList && (
        <div>
          <FormControl>
            <Select value={selected} onChange={handleSelectChange}>
              {bookRecommendations.map((l) => (
                <MenuItem key={l.rec_id} value={l.rec_id}>
                  {l.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedBook && (
            <div className="card">
              <img
                className="card-img-top"
                src="https://img.freepik.com/free-photo/creative-composition-with-books-flower_23-2148851058.jpg?w=996&t=st=1698340170~exp=1698340770~hmac=c6e8b12d8219f460faa3f47342ebe2a2cc54ba5c6b2813359bacfd849a0771ef"
                alt="book_pic"
              ></img>
              <div className="card-body">
                <p className="card-title">Title: {selectedBook.title}</p>
                <p>Category: {selectedBook.category}</p>
                <p>Recommended by: {selectedBook.name}</p>
                <p>Genre:{selectedBook.type}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;
