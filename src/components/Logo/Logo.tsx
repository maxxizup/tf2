import cls from "./Logo.module.css";

export const Logo = () => {
    return (
        <div className={cls.logo}>
            <img
                className={cls.logoImg}
                src="/src/assets/logo.jpg"
                alt="Logo"
            />
        </div>
    );
};
