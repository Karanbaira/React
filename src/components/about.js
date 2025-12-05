import UserClass from "./UserClass";
import User from "./User";

const About = () => {
  return (
    <div className="page about-page">
      <div className="page-content">
        <h1 className="page-title">About</h1>
        <h2 className="page-subtitle">This is About page</h2>
        <UserClass  />
      </div>
    </div>
  );
};

export default About;
