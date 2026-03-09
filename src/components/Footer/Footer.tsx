import cls from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={cls.footer}>
            <div className={cls.logo}>
                <img src="/src/assets/react.svg" alt="" />
                <h3>
                    <span style={{ color: "red" }}>TF2</span>Shop
                </h3>
            </div>
        </footer>
    );
};
