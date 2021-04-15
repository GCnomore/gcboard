import { useEffect, useState } from "react";
import { grabAndSlide } from "../api/api";
import axios from "axios";
import styled from "styled-components";

export default function News() {
  const [news, setNews] = useState();

  useEffect(() => {
    grabAndSlide("newsContainer", 0.8);
    getNews();
  }, []);

  const getNews = async () => {
    console.log("getting news");
    const { REACT_APP_NEWS_API_KEY } = process.env;
    const newsData = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${REACT_APP_NEWS_API_KEY}`
    );
    const newsArticles = newsData.data.articles;
    setNews(newsArticles);
  };

  return (
    <NewsContainer className="newsContainer">
      {news &&
        news.map((item, index) => (
          <NewsWrap image={item.urlToImage} url={item.url} key={index}>
            <NewsTitle>{item.title.slice(0, 60)}...</NewsTitle>
          </NewsWrap>
        ))}
    </NewsContainer>
  );
}

const NewsContainer = styled.div`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40vw;
  display: flex;
  overflow: hidden;
`;

const NewsWrap = styled.div`
  min-width: 10vw;
  min-height: 15vh;
  background-image: url(${(props) => props.image});
  background-position: top;
  background-size: auto 10vh;
  background-repeat: no-repeat;
`;

const NewsTitle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
`;
