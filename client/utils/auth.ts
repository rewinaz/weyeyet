export const handleLogin = () => {
	window.location.assign("/api/auth/login");
};

export const handleLogout = () => {
	window.location.assign("/api/auth/logout");
};

export const handleSignup = () => {
	window.location.assign("/api/auth/signup");
};
