import { HashRouter, Route, Routes } from "react-router-dom";
import { Home, Setting } from "./pages";
import { Sidebar } from "./components";

function App() {
  return (
    <HashRouter basename="/">
      <main className="flex h-screen ">
        <div className="w-16 bg-gray-200 dark:bg-gray-800 h-screen">
          <Sidebar />
        </div>
        <div className="w-full h-screen overflow-y-scroll bg-light dark:bg-dark">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </main>
    </HashRouter>
  );
}

export default App;
