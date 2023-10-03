import './App.css';

import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signin/Signup";
import ResetPassword from "./pages/Resetpass/resetpassword";
import ResetPasswordPage from './pages/Signin/ResetPasswordPage';
import Card from 'antd/es/card/Card';
import { Toaster } from "react-hot-toast";
import CreateEditPlaylist from "./pages/CreateEditPlaylist";
import ManageHome from './pages/Manage/ManageHome';
import AddEditSong from "./pages/Manage/AddEditSong";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="App">
      {loading && <Spinner />}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/resetpassword" element={<PublicRoute><ResetPassword /></PublicRoute>} />
          <Route path="/users/reset-password/:token" element={<PublicRoute> <ResetPasswordPage /></PublicRoute>} />
          <Route path="/create-edit-playlist" element={<ProtectedRoute><CreateEditPlaylist /></ProtectedRoute>} />
          <Route path="/manage" element={<ProtectedRoute><ManageHome /></ProtectedRoute>} />
          <Route path="/manage/add-edit-song" element={<ProtectedRoute><AddEditSong /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Card /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
