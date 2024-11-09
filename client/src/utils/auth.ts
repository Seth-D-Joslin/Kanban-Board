import { JwtPayload, jwtDecode } from "jwt-decode";
import type { UserLogin } from "../interfaces/UserLogin";

class AuthService {
  getProfile() {
    // DONE: return the decoded token
    return jwtDecode<UserLogin>(this.getToken());
  }

  loggedIn() {
    // DONE: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }

  isTokenExpired(token: string) {
    // DONE: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    // DONE: return the token
    const loggedIn = localStorage.getItem("loggedIn") || "";
    return loggedIn;
  }

  login(idToken: string) {
    // DONE: set the token to localStorage
    localStorage.setItem("loggedIn", idToken);
    // DONE: redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // DONE: remove the token from localStorage
    localStorage.removeItem("loggedIn");
    // DONE: redirect to the login page
    window.location.assign("/");
  }
}

export default new AuthService();
