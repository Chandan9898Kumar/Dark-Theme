import React, { useRef, memo } from 'react';
const Scroller = ({ data, item, setItem, isLoading, fetchData }) => {
  const elem = useRef('');
  const handleScroll = () => {
    if (elem.current.scrollTop + elem.current.clientHeight >= elem.current.scrollHeight) {
      let nextValue = item + 10;
      setItem((prev) => prev + 10);
      fetchData(nextValue);
    }
  };

  return (
    <div
      ref={elem}
      onScroll={handleScroll}
      style={{ border: 'none', height: '400px', overflow: 'auto', boxShadow: '2px 2px 4px 4px cadetblue' }}
    >
      <h1 style={{ textAlign: 'center' }}>Infinite Scroller</h1>
      <div>
        {data?.products?.map((item, index) => {
          return (
            <div style={{ padding: '20px' }} key={index}>
              {index + 1}
              {'  '}
              {item.category}
            </div>
          );
        })}
        {isLoading && <h1>Loading ...</h1>}
      </div>
    </div>
  );
};

export default memo(Scroller);
