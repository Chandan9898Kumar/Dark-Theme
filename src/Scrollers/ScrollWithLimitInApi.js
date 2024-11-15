import React, { useEffect, useState, useRef } from 'react';


const InfiniteScroller = ({ url, limit, render, children }) => {
  const element = useRef(null);
  const childWithRef = React.cloneElement(children, { ref: element });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [endpoint, setEndpoint] = useState(`${url}?limit=${limit || 50}`);
  const [message, setMessage] = useState('');

  const getUrl = (url, page, limit) => {
    return `${url}?limit=${limit || 50}&skip=${page * limit || 50}`;
  };

  const setInitialData = async () => {
    try {
      const response = await fetch(endpoint);
      if (response.status !== 200) {
        throw new Error('Something Went Wrong...');
      }
      const json = await response.json();
      setData(json[Object.keys(json)[0]]);
      setPage(page + 1);
      setEndpoint(getUrl(url, page, limit));
      setLoading(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const intersectionObserver = new IntersectionObserver(async (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setLoading(true);
      setPage(page + 1);
      setEndpoint(getUrl(url, page, limit));
      const response = await fetch(endpoint);
      const json = await response.json();

      setData([...data, ...json[Object.keys(json)[0]]]);
      setLoading(false);
      if (json.total === json.skip + json.limit) {
        setIsLastPage(true);
        intersectionObserver.unobserve(element.current);
        setMessage('Max Data Limit has been Reached, There are not data left');
      }
    }
  });

  useEffect(() => {
    if (!data.length) {
      setInitialData();
    }

    if (!isLastPage) {
      intersectionObserver.observe(element.current);
    }
    return () => {
      element.current && intersectionObserver.unobserve(element.current);
    };
  }, [loading, page, endpoint]);

  return (
    <React.Fragment>
      {!!data.length && render(data)}
      {!isLastPage ? childWithRef : <ShowFinalMessage message={message} />}
    </React.Fragment>
  );
};

export default InfiniteScroller;

const ShowFinalMessage = ({ message }) => {
  return (
    <>
      <div className="loader">{message}</div>
    </>
  );
};
