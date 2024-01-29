import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/connect.provider";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import Header from "./components/Header";
import ReactModal from "react-modal";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
ReactModal.setAppElement("#root");

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/offer/:id" element={<Offer />} />

          <Route path="/publish" element={<Publish />} />

          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
