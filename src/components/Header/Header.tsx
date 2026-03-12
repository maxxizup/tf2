import cls from "./Header.module.css";
import { Link } from "react-router";
import { Logo } from "@/components/Logo/Logo";

export const Header = () => {
    return (
        <header className={cls.header}>
            <Logo />
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
                <p className={cls.link}>77.35.47.116</p>
            </div>
        </header>
    );
};
