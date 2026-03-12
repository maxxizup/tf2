import cls from "./Footer.module.css";
import { Logo } from "@/components/Logo/Logo";

export const Footer = () => {
    return (
        <footer className={cls.footer}>
            <Logo />
        </footer>
    );
};
