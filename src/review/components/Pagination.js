import React from 'react';

const paginationStyle = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    padding: 0,
  },
  pageItem: {
    margin: '0 5px',
  },
  pageButton: {
    color: '#000',
    backgroundColor: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '5px 10px',
  },
  activeButton: {
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#888',
    cursor: 'default',
  },
};

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div style={paginationStyle.pagination}>
      <button 
        style={{...paginationStyle.pageButton, ...(currentPage === 0 ? paginationStyle.disabledButton : {})}}
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 0}
      >
        &lt;
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number}
          style={{
            ...paginationStyle.pageButton,
            ...(currentPage === number ? paginationStyle.activeButton : {})
          }}
          onClick={() => paginate(number)}
        >
          {number + 1}
        </button>
      ))}
      <button 
        style={{...paginationStyle.pageButton, ...(currentPage === totalPages - 1 ? paginationStyle.disabledButton : {})}}
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === totalPages - 1}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;