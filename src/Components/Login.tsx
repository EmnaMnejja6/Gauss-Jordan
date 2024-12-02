const Login = () => {
  const style = {
    formContainer: {
      width: "80%",
      backgroundColor: "white",
    },
    "@media screen and (max-width: 1000px)": {
      formContainer: {
        width: "45%",
      },
    },
    "@media screen and (max-width: 700px)": {
      formContainer: {
        width: "65%",
      },
    },
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="p-5 rounded bg-white" style={style.formContainer}>
        <form>
          <h3>Se Connecter</h3>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              <i className="bx bx-mail-send"></i> Nom d'utilisateur
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              <i className="bx bx-lock-alt"></i> Mot de Passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Mot de passe"
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input type="checkbox" className="form-check-input" id="check" />
            <label htmlFor="check" className="form-check-label">
              Se souvenir de moi sur ce device.
            </label>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              <i className="bx bx-log-in"></i> Se Connecter
            </button>
          </div>
          <p className="text-end mt-2">
            Vous n'avez pas de compte?{" "}
            <a href="/signup">
              <i className="bx bx-user-plus"></i> Inscrivez-vous
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
