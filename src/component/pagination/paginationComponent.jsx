/* eslint-disable */

import _ from 'lodash';
// import { useEffect, useState } from 'react';

const PaginationComponet = ({ itemCount, pagesize, onPagechange, currentPage }) => {
  //   const [show, setShow] = useState();
  const pagecount = Math.ceil(itemCount / pagesize);
  if (pagecount === 1) return null;
  //   useEffect(() => {
  //     if (pagecount === 1 || pagecount === 0) return setShow(false);
  //     else return setShow(true);
  //   }, [itemCount]);
  const pages = _.range(1, pagecount + 1);
  const showcurrent = currentPage > 3 && currentPage < currentPage - 3;

  console.log(currentPage <= pagecount - 4);
  return (
    <>
      {pagecount <= 10 ? (
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10 gap-x-2">
            {pages?.map((page) => (
              <li key={page}>
                <a
                  className={`flex items-center cursor-pointer px-4 ${
                    currentPage === page
                      ? ' bg-secondary text-white bg-gray-500 '
                      : ' border-2 border-accent rounded-md '
                  }  bg-secondary justify-center  h-10 leading-tight text-gray-500 border border-gray-300 rounded-lg`}
                  onClick={() => onPagechange(page)}>
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10 gap-x-2">
            <li
              key={1}
              className={`flex items-center text-sm  cursor-pointer ${
                currentPage === 1
                  ? ' bg-secondary text-white bg-gray-500'
                  : ' border-2 border-accent rounded-md '
              }  bg-secondary justify-center w-12 h-10 leading-tight text-gray-500 border border-gray-300 rounded-lg`}
              onClick={() => onPagechange(1)}>
              1
            </li>
            <li
              key={2}
              className={`flex items-center text-sm  cursor-pointer ${
                currentPage === 2
                  ? ' bg-secondary text-white bg-gray-500'
                  : ' border-2 border-accent rounded-md '
              }  bg-secondary justify-center w-12 h-10 leading-tight text-gray-500 border border-gray-300 rounded-lg`}
              onClick={() => onPagechange(2)}>
              2
            </li>
            <li
              key={3}
              className={`flex items-center text-sm  cursor-pointer ${
                currentPage === 3
                  ? ' bg-secondary text-white bg-gray-500'
                  : ' border-2 border-accent rounded-md '
              }  bg-secondary justify-center w-12 h-10 leading-tight text-gray-500 border border-gray-300 rounded-lg`}
              onClick={() => onPagechange(3)}>
              3
            </li>

            {currentPage !== 4 && currentPage !== 5 && (
              <>
                {' '}
                <li>.</li>
                <li>.</li>
              </>
            )}
            {currentPage > 4 && currentPage <= pagecount - 2 && (
              <li
                key={currentPage - 1}
                className="flex items-center text-sm  cursor-pointer  justify-center w-12 h-10 leading-tight border-2 border-gray-300 text-dominant-500 rounded-lg"
                onClick={() => onPagechange(currentPage - 1)}>
                {currentPage - 1}
              </li>
            )}
            {currentPage > 3 && currentPage <= pagecount - 3 && (
              <li
                key={currentPage}
                className="flex items-center text-sm  cursor-pointer   justify-center w-12 h-10 leading-tight  bg-gray-500 text-white rounded-lg">
                {currentPage}
              </li>
            )}
            {currentPage >= 3 && currentPage <= pagecount - 4 && (
              <li
                key={currentPage + 1}
                className="flex items-center text-sm  cursor-pointer text-dominant-500  justify-center w-12 h-10 leading-tight  border-2 border-gray-300 rounded-lg"
                onClick={() => onPagechange(currentPage + 1)}>
                {currentPage + 1}
              </li>
            )}
            {currentPage >= pagecount - 1 && (
              <li
                key={pagecount - 3}
                className="flex items-center text-sm  cursor-pointer text-dominant-500  justify-center w-12 h-10 leading-tight  border-2 border-gray-300 rounded-lg"
                onClick={() => onPagechange(pagecount - 3)}>
                {pagecount - 3}
              </li>
            )}

            <li>.</li>
            <li>.</li>
            <li
              key={pages?.length - 2}
              className={`flex items-center cursor-pointer ${
                currentPage === pages?.length - 2
                  ? ' bg-secondary text-white bg-gray-500'
                  : ' border-2 border-accent rounded-md '
              }  bg-secondary justify-center w-12 h-10 leading-tight text-gray-500 border border-gray-300 rounded-lg`}
              onClick={() => onPagechange(pages?.length - 2)}>
              {pages?.length - 2}
            </li>
            <li
              key={pages?.length - 1}
              className={`flex items-center cursor-pointer ${
                currentPage === pages?.length - 1
                  ? ' bg-secondary text-white bg-gray-500'
                  : ' border-2 border-accent rounded-md '
              }  bg-secondary justify-center w-12 h-10 leading-tight text-gray-500 border border-gray-300 rounded-lg`}
              onClick={() => onPagechange(pages?.length - 1)}>
              {pages?.length - 1}
            </li>
            <li
              key={pages?.length}
              className={`flex items-center cursor-pointer ${
                currentPage === pages?.length
                  ? ' bg-secondary text-white bg-gray-500'
                  : ' border-2 border-accent rounded-md '
              }  bg-secondary justify-center w-12 h-10 leading-tight text-gray-500 border border-gray-300 rounded-lg`}
              onClick={() => onPagechange(pages?.length)}>
              {pages?.length}
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default PaginationComponet;
