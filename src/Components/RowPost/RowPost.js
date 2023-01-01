import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { API_KEY, imageUrl } from "../../constants/constants";
import "./RowPost.css";
import "../../urls";
import YouTube from "react-youtube";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        // alert('Network Error')
        console.log(err);
      });
  },);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    axios
      .get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        // console.log(response.data);
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log("Array empty");
        }
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj, key_id) => (
          <img
            onClick={() => handleMovie(obj.id)}
            src={`${imageUrl + obj.poster_path}`}
            alt="Poster"
            className={props.isSmall ? "smallPoster" : "poster"}
            key={key_id}
          />
        ))}
      </div>
      {urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;