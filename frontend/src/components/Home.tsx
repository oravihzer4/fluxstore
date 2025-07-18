import type { FunctionComponent } from "react";
import Products from "./Products";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-2">
        <Products />
      </div>
    </>
  );
};

export default Home;
