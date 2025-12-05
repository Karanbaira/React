import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.log(err);
  return (
    <div className="page error-page">
      <div className="page-content">
        <h1 className="page-title">Oops!</h1>
        <h2 className="page-subtitle">Something went wrong!!!</h2>
      </div>
    </div>
  );
};

export default Error;
