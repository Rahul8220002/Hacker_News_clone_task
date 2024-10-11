import Container from "react-bootstrap/esm/Container";

const NewsCard = ({ artical }) => {
  if (!artical.title) return null;
  return (
    <div className="news_artical">
      <Container className="">
        <div>
          <article className="main_artical">
            <div className="d-flex artical_group">
              <h5>{artical.title}</h5>
              <a href={artical.url} className="artical_url">
                ({artical.url})
              </a>
            </div>
            <div className="artical_render d-flex ">
              <a href={artical.points} className="artical_points">
                points{artical.points}
              </a>

              <a href={artical.author} className="artical_author">
                {artical.author}
              </a>
              <a href={artical.author} className="artical_comments">
                {artical.num_comments}
              </a>
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
};
export default NewsCard;
