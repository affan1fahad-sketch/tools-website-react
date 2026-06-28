import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ImageToPDF from "./pages/ImageToPDF";
import QRGenerator from "./pages/QRGenerator";
import PasswordGenerator from "./pages/PasswordGenerator";
import ImageCompressor from "./pages/ImageCompressor";
import WordCounter from "./pages/WordCounter";
import ColorPicker from "./pages/ColorPicker";
import AgeCalculator from "./pages/AgeCalculator";
import BMICalculator from "./pages/BMICalculator";
import UnitConverter from "./pages/UnitConverter";
import PercentageCalculator from "./pages/PercentageCalculator";
import LoremIpsum from "./pages/LoremIpsum";
import MarkdownToHtml from "./pages/MarkdownToHtml";
import ScientificCalculator from "./pages/ScientificCalculator";
import TextCaseConverter from "./pages/TextCaseConverter";
import Stopwatch from "./pages/Stopwatch";
import TipCalculator from "./pages/TipCalculator";
import GpaCalculator from "./pages/GpaCalculator";
import GradePercentageCalculator from "./pages/GradePercentageCalculator";
import CurrencyConverter from "./pages/CurrencyConverter";
import CharLimitChecker from "./pages/CharLimitChecker";
import EmiCalculator from "./pages/EmiCalculator";
import DateDifference from "./pages/DateDifference";
import ContrastChecker from "./pages/ContrastChecker";
import Donate from "./pages/Donate";
import Privacy from "./pages/Privacy";
import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/qr-code-generator" element={<QRGenerator />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/lorem-ipsum-generator" element={<LoremIpsum />} />
          <Route path="/markdown-to-html" element={<MarkdownToHtml />} />
          <Route path="/calculator" element={<ScientificCalculator />} />
          <Route path="/text-case-converter" element={<TextCaseConverter />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/tip-calculator" element={<TipCalculator />} />
          <Route path="/gpa-calculator" element={<GpaCalculator />} />
          <Route path="/grade-percentage-calculator" element={<GradePercentageCalculator />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/character-limit-checker" element={<CharLimitChecker />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/date-difference-calculator" element={<DateDifference />} />
          <Route path="/color-contrast-checker" element={<ContrastChecker />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;