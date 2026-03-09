import cls from "./Header.module.css";
import { Link } from "react-router";

export const Header = () => {
    return (
        <header className={cls.header}>
            <div className={cls.logo}>
                <img src="/src/assets/react.svg" alt="" />
                <h3>
                    <span style={{ color: "red" }}>TF2</span>Shop
                </h3>
            </div>
            <div className={cls.linkGroup}>
                <Link className={cls.link} to="/">
                    Главная
                </Link>
                <Link className={cls.link} to="/">
                    FAQ
                </Link>
                <Link className={cls.link} to="/">
                    Отзывы
                </Link>
                <Link className={cls.link} to="/">
                    Контакты
                </Link>
            </div>
        </header>
    );
};
