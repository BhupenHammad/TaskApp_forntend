import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const user = await authService.login(userData);
      if (user) {
        navigate('/');
      }
    } catch (error) {
      alert(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  to-gray-50">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-gray-200/50">
        <section className="text-center mb-8 font-poppins">
          <h1 className="text-4xl font-bold flex items-center justify-center space-x-2 text-gray-800 [text-shadow:0_2px_4px_rgba(0,0,0,0.15)]">
             Login
          </h1>
          <p className="text-gray-600 mt-2 font-medium">Login and start setting tasks</p>
        </section>

        <section className="font-poppins">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 bg-gradient-to-r from-gray-100 to-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-gradient-to-r from-gray-100 to-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-black to-gray-700 text-white p-3 rounded-lg font-semibold"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
