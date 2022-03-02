import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    let showPages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    if (pageNumbers.length > 10) {
        showPages = ['Previous', 1, 2, 3, '...', pageNumbers.length - 1, pageNumbers.length, 'Next']

    } else {
        showPages = [...pageNumbers]
    }

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                {showPages.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
