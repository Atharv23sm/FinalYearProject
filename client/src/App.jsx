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
const TestRegistration = lazy(() => import("./pages/TestRegistration"));
const CandidateLogin = lazy(() => import("./pages/CandidateLogin"));
const SuccessfulRegistration = lazy(() => import("./pages/SuccessfulRegistration"));
const StartPage = lazy(() => import("./pages/StartPage"));
const EndPage = lazy(() => import("./pages/EndPage"));
const CandidateResult = lazy(() => import("./pages/CandidateResult"));

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
              <Route path="/test/:testId" element={<Test />} />
              {/* <Route path="/get-test-preview" element={<TestPreview />} /> */}
              <Route path="/test-details/:testId" element={<TestDetails />} />
              <Route path="/test-register/:testId" element={<TestRegistration />} />
              <Route path="/candidate-login/:testId" element={<CandidateLogin />} />
              <Route path="/successful-registration" element={<SuccessfulRegistration />} />
              <Route path="/start-page/:testId" element={<StartPage />} />
              <Route path="/end-page" element={<EndPage />} />
              <Route path="/test-results/:testId" element={<CandidateResult />} />

            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
