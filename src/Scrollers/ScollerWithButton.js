
import React, { useState, memo, useCallback } from 'react';




//  Using Class component
const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
});

const applySetResult = (result) => (prevState) => ({
  hits: result.hits,
  page: result.page,
});

const getHackerNewsUrl = (value, page) =>
  `https://hn.algolia.com/api/v1/search?query=${value}&page=${page}&hitsPerPage=100`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      page: null,
    };
  }

  onInitialSearch = (e) => {
    e.preventDefault();

    const { value } = this.input;

    if (value === '') {
      return;
    }

    this.fetchStories(value, 0);
  };

  onPaginatedSearch = (e) =>
    this.fetchStories(this.input.value, this.state.page + 1);

  fetchStories = (value, page) =>
    fetch(getHackerNewsUrl(value, page))
      .then((response) => response.json())
      .then((result) => this.onSetResult(result, page));

  onSetResult = (result, page) =>
    page === 0
      ? this.setState(applySetResult(result))
      : this.setState(applyUpdateResult(result));

  render() {
    return (
      <div className="page">
        <div className="interactions">
          <form type="submit" onSubmit={this.onInitialSearch}>
            <input type="text" ref={(node) => (this.input = node)} />
            <button type="submit">Search</button>
          </form>
        </div>

        <List
          list={this.state.hits}
          page={this.state.page}
          onPaginatedSearch={this.onPaginatedSearch}
        />
      </div>
    );
  }
}

const List = ({ list, page, onPaginatedSearch }) => (
  <div>
    <div className="list">
      {list.map((item) => (
        <div className="list-row" key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </div>
      ))}
    </div>

    <div className="interactions">
      {page !== null && (
        <button type="button" onClick={onPaginatedSearch}>
          More
        </button>
      )}
    </div>
  </div>
);

export default App;



//                     By Using Functional Component.

// export default function FunctionApp() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [inputValue, setInputValue] = useState('');

//   const handleClick = () => {
//     if (inputValue.trim()) {
//       fetchResult(inputValue, page);
//     }
//   };

//   const fetchResult = useCallback(
//     async (value, currentPage) => {
//       console.log(value, currentPage);
//       try {
//         const response = await fetch(
//           `https://hn.algolia.com/api/v1/search?query=${value}&page=${currentPage}&hitsPerPage=100`
//         );

//         if (response.status !== 200) {
//           throw new Error('Error Found');
//         }

//         const result = await response.json();
//         setData([...data, ...result.hits]);
//         setPage(currentPage + 1);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     [data, page]
//   );

//   return (
//     <div>
//       <h1>Hello StackBlitz! Scroller</h1>
//       <div>
//         <input
//           value={inputValue}
//           placeholder="Search"
//           onChange={(event) => {
//             setInputValue(event.target.value);
//           }}
//         />
//         <button onClick={handleClick}>Search</button>
//       </div>
//       <ListOfItem
//         data={data}
//         inputValue={inputValue}
//         page={page}
//         fetchResult={fetchResult}
//       />
//     </div>
//   );
// }

// const List = ({ data, page, inputValue, fetchResult }) => {
//   return (
//     <div>
//       {data?.map((item, index) => {
//         return (
//           <div key={item.objectID} style={{ padding: '10px' }}>
//             {index + 1} <a href={item.url}>{item.title}</a>
//           </div>
//         );
//       })}

//       <div>
//         {!!page && !!data.length && (
//           <button onClick={() => fetchResult(inputValue, page)}>
//             MORE {page}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const ListOfItem = memo(List);
