import cls from "./TradeForm.module.css";
import type { Dispatch, SetStateAction } from "react";

interface TradeFormProps {
    amount: number | "";
    cost: number | "";
    setAmount: Dispatch<SetStateAction<number | "">>;
    setCost: Dispatch<SetStateAction<number | "">>;
    buyKeys: () => Promise<void>;
}

export const TradeForm = (props: TradeFormProps) => {
    const { amount, setAmount, buyKeys, cost, setCost } = props;

    return (
        <form
            className={cls.keyForm}
            onSubmit={(e) => {
                e.preventDefault();
                buyKeys();
            }}
        >
            <div className={cls.selectBuySell}>
                <button className={cls.selectBtn}>Купить</button>
                <button className={cls.selectBtn}>Продать</button>
            </div>
            <div className={cls.inputGroup}>
                <div className={cls.inputGroup_left}>
                    <span>Вы получите</span>
                    <input
                        className={cls.keyFormInput}
                        type="text"
                        placeholder="Кол-во"
                        value={amount}
                        onChange={(e) => setAmount(+e.target.value)}
                    />
                </div>
                <div className={cls.inputGroup_right}></div>
            </div>
            <div className={cls.inputGroup}>
                <div className={cls.inputGroup_left}>
                    <span>Вы платите</span>
                    <input
                        className={cls.keyFormInput}
                        type="text"
                        placeholder="Сумма"
                        value={cost}
                        onChange={(e) => setCost(+e.target.value)}
                        readOnly
                    />
                </div>
                <div className={cls.inputGroup_right}>
                    <span>Валюта</span>
                    <select className={cls.Select}>
                        <option className={cls.Option} value="RUB">
                            RUB
                        </option>
                    </select>
                </div>
            </div>
            <button className={cls.keyFormSubmitBtn} type="submit">
                Купить
            </button>
        </form>
    );
};
