import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const onLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-gray-100 to-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center p-4 font-poppins">
        <div className="text-3xl font-bold text-gray-800 [text-shadow:0_1px_2px_rgba(0,0,0,0.1)]">
          <Link to="/">TaskApp</Link>
        </div>
        <ul className="flex items-center space-x-6">
          {user ? (
            <li>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-700 font-semibold"
              >
                <FaSignOutAlt className="text-black" /> <span>Logout</span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-gray-700 font-semibold"
                >
                  <FaSignInAlt className="text-black" /> <span>Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 text-gray-700 font-semibold"
                >
                  <FaUser className="text-black" /> <span>SignUp</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
