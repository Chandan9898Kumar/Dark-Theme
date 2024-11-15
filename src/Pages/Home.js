import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import './pages.css';

import ScrollerOnElement from '../Scrollers/ElementScroller';
import AppWithIntersection from '../Scrollers/ScrollerWithIntersection';
import InfiniteScroller from '../Scrollers/ScrollWithLimitInApi';
const HomePage = () => {
  //  This is For Scroller With Button
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  // ==================================================

  //  This part Belongs to infinite Scroller on Element

  const [infiniteData, setInfiniteData] = useState([]);
  const [item, setItem] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (nextValue = 10) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${nextValue}`);
      if (response.status !== 200) {
        throw new Error('Something Went Wrong ...');
      }

      const result = await response.json();

      setInfiniteData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  Till Here belongs to infinite scroller First Scroller Component

  // =====================================================================================================================================

  //  This part Belongs to infinite Scroller With Button

  const applyUpdateResult = (result) => {
    setData([...data, ...result.hits]);
  };

  const applySetResult = (result) => {
    setData(result.hits);
  };

  const handleClick = () => {
    if (inputValue.trim()) {
      fetchResult(inputValue, 0);
    }
  };

  const fetchResult = useCallback(
    async (value, currentPage) => {
      setIsDisabled(true);
      try {
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${value}&page=${currentPage}&hitsPerPage=100`
        );

        if (response.status !== 200) {
          throw new Error('Error Found');
        }

        const result = await response.json();
        if (currentPage) {
          applyUpdateResult(result);
        } else {
          applySetResult(result);
        }
        setPage(currentPage + 1);
      } catch (error) {
        console.log(error);
      } finally {
        setIsDisabled(false);
      }
    },
    [data, page, inputValue]
  );
  //  Till here ==================================================================================

  //  This is for Scroller with api Limit

  const displayItems = (posts) => {
    return (
      <>
        {posts.map((item, index) => (
          <article key={index}>
            #{item.id}: {item.title}
          </article>
        ))}
      </>
    );
  };

  //  Till Here

  return (
    <div className="Page-Container">
      <h2 style={{ textAlign: 'center', textShadow: '3px 0px 3px plum' }}>This is Home Page</h2>

      <div className="Sub-Container">
        <div className="Child-One">
          <h1>Scroller On Element</h1>
          <ScrollerOnElement
            data={infiniteData}
            item={item}
            setItem={setItem}
            isLoading={isLoading}
            fetchData={fetchData}
          />
        </div>

        <div className="Child-Two">
          <h1>Scroller Using Button</h1>
          <div className="events">
            <input
              className="input-field"
              value={inputValue}
              placeholder="Search"
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
            <button className="Search-Button" onClick={handleClick}>
              Search
            </button>
          </div>
          <ListOfItem
            data={data}
            inputValue={inputValue}
            page={page}
            fetchResult={fetchResult}
            isDisabled={isDisabled}
          />
        </div>

        <div className="Child-Three">
          <h1>Scroller Using Intersection</h1>
          <AppWithIntersection />
        </div>
      </div>

      <div className="scroll-head">
        <h1>Scroller with Limit</h1>
        <div className="scroll-body">
          <InfiniteScroller url="https://dummyjson.com/posts" limit={50} render={displayItems}>
            <div className="loader">Loading...</div>
          </InfiniteScroller>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);

const List = ({ data, page, inputValue, fetchResult, isDisabled }) => {
  const main = useRef('');
  const handleScrollToTop = () => {
    main.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div ref={main} className="wrapper-two">
      {data?.map((item, index) => {
        return (
          <div key={item.objectID} style={{ padding: '10px' }}>
            {index + 1} <a href={item.url}>{item.title}</a>
          </div>
        );
      })}

      <div style={{ textAlign: 'center', padding: '8px 8px', margin: '10px auto' }}>
        {!!page && !!data.length && (
          <div>
            <button
              style={{ cursor: 'pointer', fontSize: '18px', padding: '5px 5px' }}
              disabled={isDisabled}
              onClick={() => fetchResult(inputValue, page)}
            >
              MORE {page}
            </button>
            <button style={{ cursor: 'pointer', fontSize: '18px', padding: '5px 5px' }} onClick={handleScrollToTop}>
              scroller To Top
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ListOfItem = memo(List);
