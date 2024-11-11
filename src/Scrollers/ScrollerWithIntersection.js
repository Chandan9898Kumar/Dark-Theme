import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../Pages/pages.css';

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [offSet, setOffset] = useState(10);
  const currentPage = useRef(page);

  const URL = `https://www.omdbapi.com/?apikey=93789fba&s=batman&page=${page}`;

  const fetchItem = async () => {
    currentPage.current = page;
    setIsError('');
    try {
      const response = await fetch(URL);
      if (response.status !== 200) {
        throw Error('Something Went Wrong...');
      }
      const result = await response.json();
      setData([...data, ...result.Search]);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [page]);

  const displayData = useCallback(() => {
    return (
      <>
        {data?.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: '450px',
                border: '1px solid black',
                padding: '10px 10px',
                margin: '10px auto',
              }}
            >
              <img src={item.Poster} loading="lazy" alt={item.Title} width="430px" height="350px" />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '20px',
                }}
              >
                <span>Title : {item.Title}</span>

                <span>Type : {item.Type}</span>
              </div>
            </div>
          );
        })}
      </>
    );
  }, [data]);
  console.log(page, 'page');
  return (
    <div>
      <InfiniteScroller setPage={setPage} currentPage={currentPage} isLoading={isLoading} displayData={displayData} />
    </div>
  );
}

const InfiniteScroller = ({ setPage = () => {}, currentPage = 0, isLoading = false, displayData = () => {} }) => {
  const elementToBeObserved = useRef('');

  const handleObserver = useCallback((entities) => {
    let target = entities[0];
    if (target.isIntersecting) {
      setPage(currentPage.current + 1);
    }
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    // Start observing the target element
    const observer = new IntersectionObserver(handleObserver, options);

    if (elementToBeObserved.current) {
      observer.observe(elementToBeObserved.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [isLoading]);

  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Data to be displayed Here</h1>
      {displayData()}
      {isLoading && (
        <div ref={elementToBeObserved}>
          <h1 style={{ textAlign: 'center' }}> Loading ...</h1>
        </div>
      )}
    </div>
  );
};

/**
      ###                                To use this feature as a reusable component

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './style.css';

const App = () => {
  const [movies, setMovies] = useState({ Search: [] });
  const [page, setPage] = useState(1);
  const currentPage = useRef(page);

  return (
    <>
      <h1>This is infinite Scroller</h1>
      <div style={{ height: '550px', overflow: 'auto' }}>
        <InfiniteScrollerPage
          movies={movies}
          setMovies={setMovies}
          page={page}
          setPage={setPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default App;

function InfiniteScrollerPage({
  movies,
  setMovies,
  page,
  setPage,
  currentPage,
}) {
  const [response, setResponse] = useState(true);
  const loader = useRef(null);
  const temp = useRef(response);

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

 */
