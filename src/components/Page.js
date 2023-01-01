import React from 'react';

const Page = ({ page, maxPage, setPage }) => {
  const limit = 3;

  return (
    <div>
      <button onClick={() => setPage(1)}>Fir</button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        ◀
      </button>
      {Array(limit)
        .fill()
        .map((data, i) => (
          <button
            key={page + i}
            onClick={() => setPage(page + i)}
            aria-current={page === page + i ? 'page' : null}
            disabled={page + i > maxPage}
          >
            {page + i}
          </button>
        ))}
      <button onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        ▶
      </button>
      <button onClick={() => setPage(maxPage)}>End</button>
    </div>
  );
};

export default Page;
