import "./App.css";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState(10);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setpageCount] = useState(1);
  const [total, setTotal] = useState(0)
  const [postsPerPage, setPostsPerPage] = useState(10)

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        // `http://localhost:3004/comments?_page=1&_limit=${limit}`
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${postsPerPage}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setTotal(total)
      setpageCount(Math.ceil(total / postsPerPage));
      setItems(data);
    };

    getComments();
  }, [postsPerPage]);

  const fetchComments = async (pageClicked) => {
    console.log(pageClicked)
    let newPage = pageClicked === 'Previous' ? currentPage - 1 : (pageClicked == 'Next' ? currentPage + 1 : pageClicked);
    newPage = newPage > pageCount ? pageCount : newPage;
    newPage = newPage < 1 ? 1 : newPage;

    setCurrentPage(newPage)

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${newPage}&_limit=${postsPerPage}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (currentPage) => {
    if (currentPage === '...') return
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };
  return (
    <div className="container">
      <label>Posts per Page</label>
      <input type='number' value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setPostsPerPage(text)}> Submit</button>
      <div className="row m-2">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">Id :{item.id} </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.email}
                  </h6>
                  <p className="card-text">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination totalPosts={total}
        postsPerPage={postsPerPage}
        paginate={handlePageClick}
      />

    </div>
  );
}

export default App;
