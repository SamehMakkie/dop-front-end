import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const NavigationWrapper = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default NavigationWrapper;
