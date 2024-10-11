import axios from "axios";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import NewsCard from "./NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/apiSlice/authSlice";

const Dashboard = () => {
  const [currentpage, setCurrentpage] = useState(0);
  const [search, setsearch] = useState("");
  const [isloading, setloading] = useState(true);
  const [artical, setartical] = useState([]);
  const [query, setquery] = useState("");
  // const [isShow, setIsShow]=useState(false)
  const [isPages, setIsPage] = useState(0);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setsearch(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [currentpage, query]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://hn.algolia.com/api/v1/search?",
        { params: { page: currentpage, query } }
      );

      const { hits, nbPages } = data;
      setartical(hits);
      setIsPage(nbPages);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentpage(0);
    setquery(search);
  };
  const handlePageChage = (e) => {
    setCurrentpage(e.selected);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // const ErrorReturn = () => {
  //   return alert("please log in...");
  // };

  return (
    <>
      <Navbar className="bg-body-tertiary ">
        <Container className="d-flex justify-content-between navbar_group">
          <Navbar.Brand>
            <IoNewspaperOutline />
          </Navbar.Brand>
          <Navbar.Brand className="news_heading">
            <div className="font-monospace mb-0">Search</div>
            <span className="fs-6 mt-0">Hacker News</span>
          </Navbar.Brand>
          <Form className="d-flex justify-content-center align-items-center w-100">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 w-75 border-0"
              aria-label="Search"
              value={search}
              onChange={handleChange}
            />
            <Button
              variant="outline-white"
              className="bg-white"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Form>
          <Navbar.Brand>
            <IoSettingsOutline />
            {isAuthenticated === true ? (
              <>
                <button
                  className="fs-6 mx-1 p-1 border-0 bg-danger-subtle"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="fs-6 text-bg-secondary px-2 text-decoration-none rounded-1 p-1 mx-2"
              >
                login
              </Link>
            )}
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <div className="d-flex mb-2 p-1">
          <div className="filter_search">
            <span> search</span>
            <select name="" id="">
              <option value="choose">All</option>
              <option value="User">Stories</option>
              <option value="User">Comments</option>
              <option value="User">Ask HN</option>
              <option value="User">Show HN</option>
              <option value="User">Launch HN</option>
              <option value="User">Job</option>
              <option value="Admin">Polls</option>
            </select>
          </div>
          <div className="filter_box">
            <span>by</span>
            <select name="" id="">
              <option value="choose">Popularity</option>
              <option value="User">Popularity</option>
              <option value="User">Date</option>
            </select>
          </div>
          <div className="filter_box">
            <span>for</span>
            <select name="" id="">
              <option value="choose">All Time</option>
              <option value="User">All Time</option>
              <option value="User">Last 24h</option>
              <option value="User">Past Week</option>
              <option value="User">Past Month</option>
              <option value="User">Past Year</option>
            </select>
          </div>
        </div>
      </Container>

      {isAuthenticated === true ? (
        <>
          <div>
            {isloading ? (
              <p>loading....</p>
            ) : (
              artical.map((artical) => (
                <NewsCard artical={artical} key={artical.objectID} />
              ))
            )}
          </div>

          <div>
            <ReactPaginate
              nextLabel=">>"
              previousLabele="<<"
              breakLabel="..."
              forcePage={currentpage}
              pageCount={isPages}
              renderOnZeroPageCount={null}
              onPageChange={handlePageChage}
              className="pagination"
              activeClassName="active-page"
              previousClassName="previous-page"
              nextClassName="next-page"
            />
          </div>
        </>
      ) : (
        <h5>please log in ...</h5>
      )}
    </>
  );
};
export default Dashboard;
