import { useState } from "react";
import { signUp } from "../firebase/firebaseAuthServices";
const Signup = ({ openLogin }: { openLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Example signup logic (replace with your auth service)
    if (!email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      // Call the signIn function from authService
      const user = await signUp(email, password, username);
      alert("Bienvenue ${user.email}, votre compte a été crée!");
    } catch (error) {
      console.error("Erreur de creation de compte:", error);
      alert("Erreur: ${error}");
    }
  };
  return (
    <form>
      <form onSubmit={handleSubmit}>
        <h3>Créer un compte</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            <i className="bx bx-mail-send"></i> Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            aria-label="Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <i className="bx bx-mail-send"></i> Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <i className="bx bx-lock-alt"></i> Mot de Passe
          </label>
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Mot de Passe"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            <i className="bx bx-log-in"></i> S'inscrire
          </button>
        </div>
        <p className="text-end mt-3">
          Vous avez déjà un compte?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openLogin();
            }}
          >
            <i className="bx bx-log-in"></i> Login
          </a>
        </p>
      </form>
    </form>
  );
};

export default Signup;
