import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Helmet>
        <title>SSR - Home</title>
        <meta name="description" content="SSR" />
      </Helmet>
      <div>
        <h1>Hello SSR</h1>
        <button onClick={(): void => alert("Hello SSR")}>click</button>
        <a href="http://127.0.0.1:3000/demo">Link jump</a>
        <span onClick={(): void => navigate("/demo")}>Router jump</span>
      </div>
    </Fragment>
  );
};

export default Home;
