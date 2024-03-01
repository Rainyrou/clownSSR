import { FC, Fragment } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { getDemoData } from "./store/demoReducer";

interface IProps {
  content?: string;
  getDemoData?: (data: string) => void;
}

const Demo: FC<IProps> = (data) => {
  return (
    <Fragment>
      <Helmet>
        <title>SSR - DEMO</title>
        <meta name="description" content="SSR Framework" />
      </Helmet>
      <div>
        <h1>{data.content}</h1>
        <button
          onClick={(): void =>
            data.getDemoData && data.getDemoData("Refreshed data")
          }
        >
          Refresh
        </button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    content: state?.demo?.content,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDemoData: (data: string) => dispatch(getDemoData(data)),
  };
};

const storeDemo: any = connect(mapStateToProps, mapDispatchToProps)(Demo);

storeDemo.getInitProps = (store: any, data?: string) =>
  store.dispatch(getDemoData(data || "This is initialization demo"));

export default storeDemo;
