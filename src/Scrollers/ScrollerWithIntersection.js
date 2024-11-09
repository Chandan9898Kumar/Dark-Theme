import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../Pages/pages.css';

export default function AppWithIntersection() {
  const [movies, setMovies] = useState({ Search: [] });
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(true);
  const loader = useRef(null);
  const temp = useRef(response);
  const currentPage = useRef(page);
  useEffect(() => {
    var options = {
      root: null, //viewport
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    currentPage.current = page;
    fetch(`https://www.omdbapi.com/?apikey=93789fba&s=batman&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        let respo = res?.Response ?? 'False';

        if (respo === 'True') {
          setMovies((data) => ({
            ...data,
            ...res.data,
            Search: [...data.Search, ...res.Search],
          }));
          setResponse(true);
          temp.current = true;
        } else if (respo === 'False') {
          setResponse(false);
          temp.current = false;
        }
      });
  }, [page]);

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (temp.current) {
          setPage(currentPage.current + 1);
        }
      }
    },
    [page]
  );

  return (
    <div className="wrapper">
      <ul>
        {movies?.Search?.map((movie, index) => {
          return <Movie id={index} key={index} movie={movie} />;
        })}
      </ul>
      <div className="loading" ref={loader}>
        {response && <h2>Loading...</h2>}
      </div>
    </div>
  );
}

function Movie(props) {
  const { movie, id } = props;

  return (
    <li className="movie" key={id}>
      <img src={movie.Poster} />
      <p className="title">{movie.Title}</p>
    </li>
  );
}
