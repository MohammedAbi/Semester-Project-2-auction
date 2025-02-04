import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100 pt-16">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
