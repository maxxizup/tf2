import cls from "./TradeForm.module.css";
import { type Dispatch, type SetStateAction } from "react";

interface TradeFormProps {
    amount: number | "";
    cost: number | "";
    setAmount: Dispatch<SetStateAction<number | "">>;
    setCost: Dispatch<SetStateAction<number | "">>;
    purchaseHandler: () => Promise<void>;
    selectedItem: "key" | "ticket";
    tradeType: "buy" | "sell";
    currentPrice: string;
}

export const TradeForm = (props: TradeFormProps) => {
    const {
        amount,
        setAmount,
        purchaseHandler,
        cost,
        selectedItem,
        tradeType,
        currentPrice,
    } = props;

    const itemConfig = {
        key: {
            name: "ключ",
            icon: "🔑",
            emoji: "🔐",
        },
        ticket: {
            name: "билет",
            icon: "🎫",
            emoji: "🎟️",
        },
    };

    const config = itemConfig[selectedItem];

    const getTitle = () => {
        const action = tradeType === "buy" ? "покупка" : "продажа";
        return `${config.icon} ${selectedItem === "key" ? "Ключи" : "Билеты"} - ${action}`;
    };

    const getPriceLabel = () => {
        return `Цена за 1 ${config.name}: ${currentPrice}₽`;
    };

    const getButtonText = () => {
        if (tradeType === "buy") {
            return `${config.emoji} Купить ${selectedItem === "key" ? "ключи" : "билеты"}`;
        }
        return `💸 Продать ${selectedItem === "key" ? "ключи" : "билеты"}`;
    };

    return (
        <form
            className={cls.keyForm}
            onSubmit={(e) => {
                e.preventDefault();
                purchaseHandler();
            }}
        >
            <h2 className={cls.formTitle}>{getTitle()}</h2>
            <p className={cls.priceLabel}>{getPriceLabel()}</p>

            {tradeType === "buy" ? (
                <>
                    <div className={cls.inputGroup}>
                        <div className={cls.inputGroup_left}>
                            <span className={cls.inputLabel}>Вы получите</span>
                            <input
                                className={cls.keyFormInput}
                                type="text"
                                placeholder={`Кол-во ${selectedItem === "key" ? "ключей" : "билетов"}`}
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value ? +e.target.value : ""
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className={cls.inputGroup}>
                        <div className={cls.inputGroup_left}>
                            <span className={cls.inputLabel}>Вы платите</span>
                            <input
                                className={`${cls.keyFormInput} ${cls.readOnlyInput}`}
                                type="text"
                                placeholder="Сумма"
                                value={cost}
                                readOnly
                            />
                        </div>
                        <div className={cls.inputGroup_right}>
                            <span className={cls.currencyLabel}>Валюта</span>
                            <select className={cls.Select} disabled>
                                <option value="RUB">RUB</option>
                            </select>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={cls.inputGroup}>
                        <div className={cls.inputGroup_left}>
                            <span className={cls.inputLabel}>Вы отдаете</span>
                            <input
                                className={cls.keyFormInput}
                                type="text"
                                placeholder={`Кол-во ${selectedItem === "key" ? "ключей" : "билетов"}`}
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value ? +e.target.value : ""
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className={cls.inputGroup}>
                        <div className={cls.inputGroup_left}>
                            <span className={cls.inputLabel}>Вы получите</span>
                            <input
                                className={`${cls.keyFormInput} ${cls.readOnlyInput}`}
                                type="text"
                                placeholder="Сумма"
                                value={cost}
                                readOnly
                            />
                        </div>
                        <div className={cls.inputGroup_right}>
                            <span className={cls.currencyLabel}>Валюта</span>
                            <select className={cls.Select} disabled>
                                <option value="RUB">RUB</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            <button
                className={`${cls.keyFormSubmitBtn} ${tradeType === "buy" ? cls.buyBtn : cls.sellBtn}`}
                type="submit"
                disabled={!amount}
            >
                {getButtonText()}
            </button>
        </form>
    );
};

// [
//     {
//         name: "Mann Co. Supply Crate Key",
//         quantity: 405,
//         sold_count: 95,
//         buy_count: xxxxx
//     },
//     {
//         name: "Tour of Duty Ticket",
//         quantity: 219,
//         sold_count: 281, //ЧтО ТАКОЕ каунт?
//         buy_count: xxxxx,
//     },
// ];
//
// по нажатию кнопки КУПИТ/ПРОДАТЬ я отправляю эту цену через апишку прямиком в платежную систему. по нажатию кнопки открывается еще одна модалка, чел выбирает
// платежную систему, ему пишется итоговая сумма и после этого его перекидывает в платежку. там уже будет цена, которую я отправляю с ФРОНТА. то есть по факту вот она
// я не проверял, но скорей всего он через апишку отправляется в платежную систему. я пошел смотреть видос крч
