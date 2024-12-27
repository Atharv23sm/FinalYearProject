import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Landing = lazy(() => import("./pages/Landing"));
const CreateTest = lazy(() => import("./pages/CreateTest"));
const Test = lazy(() => import("./pages/Test"));
// const TestPreview = lazy(() => import("./pages/TestPreview"));
const TestDetails = lazy(() => import("./pages/TestDetails"));

import Loading from "./Loading";
import { AuthProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create-test" element={<CreateTest />} />
              <Route path="/test" element={<Test />} />
              {/* <Route path="/get-test-preview" element={<TestPreview />} /> */}
              <Route path="/test-details/:testId" element={<TestDetails />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
