import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideElement from "./SideElement";
import Cards from "./Cards";
import {
  HiChevronDoubleDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import Spinner from "./Spinner";
import logo from "../assets/logo.png";

let myIsSearch = false;
export function setSearch(isSearch) {
  myIsSearch = isSearch;
}

let searchValue = "";
export function getSearchValue(mySearchValue = "") {
  searchValue = mySearchValue;
}

export default function Content() {
  const data = useSelector((state) => state.data.data);
  const searchData = useSelector((state) => state.search.search);
  const articles = data.articles;
  const totalResults = data.totalResults;
  const searchArticles = searchData.articles;
  const searchtotalResults = searchData.totalResults;
  const [mySearchArticles, setSearchArticles] = useState(null);
  const [myArticles, setArticles] = useState(null);
  const [lastItem, setLastItem] = useState(18);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [waiting, setWaiting] = useState(5000);
  useEffect(() => {
    async function getSearchArticles() {
      return await searchArticles;
    }
    getSearchArticles().then((res) => {
      setSearchArticles(res);
    });
  });
  useEffect(() => {
    async function getArticles() {
      return await articles;
    }
    getArticles().then((res) => {
      setArticles(res);
    });
  });
  useEffect(() => {
    if (currentIndex <= 3) {
      let timeOut = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, waiting);
      return () => {
        clearTimeout(timeOut);
      };
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, waiting]);
  if (
    (myIsSearch === false && myArticles != null) ||
    (myArticles != null && mySearchArticles == null)
  ) {
    return (
      <div id="my-content">
        <section id="section-Headline">
          <div
            id="section-Headline-Initial"
            onMouseOver={() => setWaiting(10000)}
            onMouseLeave={() => setWaiting(5000)}
            onDoubleClick={() => {
              window.open(myArticles[currentIndex].url);
            }}
          >
            <div id="arrows">
              <span
                id="after"
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                }}
              >
                {<HiOutlineChevronRight />}
              </span>
              <span
                id="before"
                onClick={() => {
                  if (currentIndex === 0) {
                    setCurrentIndex(3);
                  } else {
                    setCurrentIndex(currentIndex - 1);
                  }
                }}
              >
                {<HiOutlineChevronLeft />}
              </span>
            </div>
            {myArticles[currentIndex].urlToImage ? (
              <img
                id="initialImage"
                src={myArticles[currentIndex].urlToImage}
                alt={myArticles[currentIndex].description}
              />
            ) : (
              <img
                id="initialImage"
                src={logo}
                alt={myArticles[currentIndex].description}
                style={{ objectFit: "scale-down" }}
              />
            )}
            <div id="Headline-Initial-title">
              <p>{myArticles[currentIndex].title}</p>
            </div>
          </div>
          <div id="section-Headline-SideArticles">
            {myArticles.slice(5, 9).map(SideElement)}
          </div>
        </section>
        <section id="card">
          <h4>الاخبار</h4>
          <div id="allCards">{myArticles.slice(10, lastItem).map(Cards)}</div>
        </section>
        <div
          id="moreNews"
          style={lastItem > 18 ? { display: "none" } : { color: "#0d4c92" }}
        >
          <span
            id="more"
            onClick={() => {
              setLastItem(totalResults);
              setTimeout(() => {
                document
                  .getElementById("card9")
                  .scrollIntoView({ behavior: "smooth", block: "end" }, false);
              }, 10);
            }}
          >
            <HiChevronDoubleDown />
          </span>
        </div>
      </div>
    );
  } else if (myIsSearch === true || mySearchArticles != null) {
    return (
      <div id="searchContent" style={{ paddingBottom: "50px" }}>
        <div
          id="result"
          style={{ fontFamily: "IBM+Plex+Sans+Arabic", padding: "20px" }}
        >
          <div id="searchValue">{"نتائج لـ"}</div>
          <div id="value" style={{ marginTop: "20px", fontSize: "25px" }}>
            {searchValue}
          </div>
          <div id="total">
            {searchtotalResults <= 1
              ? `${searchtotalResults} نتيجة`
              : `${searchtotalResults} نتائج`}
          </div>
        </div>
        {mySearchArticles.slice(0, searchtotalResults).map(SideElement)}
      </div>
    );
  } else {
    return (
      <div id="waitingData">
        <Spinner />
      </div>
    );
  }
}
