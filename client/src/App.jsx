import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Landing = lazy(() => import("./pages/Landing"));
const CreateTest = lazy(() => import("./pages/CreateTest"));
const Test = lazy(() => import("./pages/Test"));

import Loading from "./Loading";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-test" element={<CreateTest />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
