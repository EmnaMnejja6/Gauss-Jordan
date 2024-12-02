const Signup = () => {
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
          <h3>Créer un compte</h3>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              <i className="bx bx-mail-send"></i> Email
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
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              <i className="bx bx-log-in"></i> S'inscrire
            </button>
          </div>
          <p className="text-end mt-2">
            Vous avez déjà un compte?{" "}
            <a href="/login">
              <i className="bx bx-log-in"></i> Connectez-vous
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
