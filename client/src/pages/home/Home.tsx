import * as React from "react";

// import { socket, addNotif } from "../../events/test";

// Components
import HomeHeader from "./header/HomeHeader";
import HomeFeature from "./feature/HomeFeature";
import Footer from "../../components/footer/Footer";

const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#fefefe", height: "100%" }}>
      <HomeHeader />
      <HomeFeature />
      <Footer />
    </div>
  );
};

export default Home;
