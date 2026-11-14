import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Topbar from "./components/topbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Tournaments from "./pages/tournaments";
import TournamentDetails from "./pages/tournamentDetails";
import Matches from "./pages/matches";
import Leaderboard from "./pages/leaderboard";
import Enroll from "./pages/enroll";
import Profile from "./pages/profile";
import Signin1 from "./pages/signin1";
import Signin2 from "./pages/signin2";
import Signin3 from "./pages/siginin3";
import Login from "./pages/login";
import AdminDashboard from "./admin/adminDashboard";

// Main layout component to conditionally hide Topbar & Footer
function Layout() {
  const location = useLocation();

  // Topbar နှင့် Footer
  const hideLayoutPaths = [];
  const shouldHideLayout =
    hideLayoutPaths.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center">
      <div className="w-full bg-[#f8f9fa] min-h-screen flex flex-col shadow-2xl relative">
        {!shouldHideLayout && <Topbar />}
        <main
          className={`flex-1 ${location.pathname.startsWith("/admin") ? "p-0" : "p-3 md:p-4"}`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route
              path="/tournament-details/:id"
              element={<TournamentDetails />}
            />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/leaderboard" element={<Leaderboard />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/signin-1" element={<Signin1 />} />
            <Route path="/signin-2" element={<Signin2 />} />
            <Route path="/signin-3" element={<Signin3 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        {!shouldHideLayout && <Footer />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
