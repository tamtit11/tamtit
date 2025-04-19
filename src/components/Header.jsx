import { Link, useNavigate } from "react-router-dom";
import s from "../styles/header.module.scss";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const onSubmit = () => {
    if (!user) {
      navigate("/sign-in");
    } else {
      localStorage.removeItem("user");
      navigate("/sign-in");
    }
  };

  return (
    <header className={s.header}>
      <div className={s.header__icon}>
        <span className={s.header__logo}></span>
        <span className={s.header__name}>Sakura</span>
      </div>

      <div className={s.header__content}>
        <div>
          Good Morning, <strong>{user?.username}!</strong>
        </div>

        <div className={s.header__log}>
          <button onClick={onSubmit}>
            {user?.username ? "Sign Out" : "Sign In"}
          </button>
          <span className={s["header__ic-log"]}></span>
        </div>
      </div>
    </header>
  );
}
