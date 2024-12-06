import { useState } from "react";
import { signIn } from "../firebase/firebaseAuthServices";

const Login = ({ openSignup }: { openSignup: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      // Call the signIn function from authService
      const user = await signIn(email, password);
      alert("Bienvenue ${user.email}, vous êtes connecté !");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur: ${error}");
    }
  };
  return (
    <form>
      <h3>Login</h3>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          <i className="bx bx-mail-send"></i> Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          <i className="bx bx-lock-alt"></i> Mot de Passe
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          <i className="bx bx-log-in"></i> Se connecter
        </button>
      </div>
      <p className="text-end mt-3">
        Vous n'avez pas de compte?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openSignup();
          }}
        >
          <i className="bx bx-user-plus"></i> Créer un compte
        </a>
      </p>
    </form>
  );
};

export default Login;
