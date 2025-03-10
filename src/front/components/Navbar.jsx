import { Link } from "react-router-dom";

export const Navbar = () => {
	const token=localStorage.getItem("token")

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
			{
				token && (
					<div className="ml-auto">
						<Link to="/profile">
							<button className="btn btn-primary">Profile</button>
						</Link>
					</div>
				)
			}
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
				
			</div>
		</nav>
	);
};