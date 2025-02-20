import { HashRouter, Route, Routes } from "react-router-dom";
import { Home, Setting } from "./pages";
import { Sidebar } from "./components";

function App() {
  return (
    <HashRouter basename="/">
      <main className="flex h-screen tracking-wide ">
        <div className="w-16 h-screen">
          <Sidebar />
        </div>
        <div className="w-full h-screen overflow-y-scroll bg-background dark:bg-dark-background">
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
