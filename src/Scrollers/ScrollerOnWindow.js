import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(50);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 100) {
        console.log(window.innerHeight + window.scrollY, window.document.body.offsetHeight - 100);

        setCount(count + 50);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [count]);

  const items = [];
  for (let x = 0; x < count; x++) {
    items.push(<div key={x}>{x + 1}</div>);
  }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>

      {items}
    </div>
  );
}
