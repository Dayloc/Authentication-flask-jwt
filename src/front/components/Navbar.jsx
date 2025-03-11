import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Navbar = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	// Redirige a /login si no hay token
	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token, navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token"); // Elimina el token
		navigate("/login"); // Redirige a login
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<div className="ml-auto">
					{token ? (
						<>
							<Link to="/profile">
								<button className="btn btn-primary me-2">Profile</button>
							</Link>
							<button className="btn btn-danger" onClick={handleLogout}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/login">
								<button className="btn btn-primary me-2">Login</button>
							</Link>
							<Link to="/register">
								<button className="btn btn-secondary">Register</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
