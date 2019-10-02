import * as React from "react";

// import { socket, addNotif } from "../../events/test";

// Components
import Navbar from "../../components/navbar/Navbar";
import HomeHeader from "./header/HomeHeader";
import HomeContent from "./content/HomeContent";

const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#fefefe", height: "100%" }}>
      <Navbar />
      <HomeHeader />
      <HomeContent />
      <div />
    </div>
  );
};

export default Home;
