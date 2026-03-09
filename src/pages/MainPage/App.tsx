import { Header } from "@/components/Header/Header";
import "./App.css";
import { useState } from "react";
import { Footer } from "@/components/Footer/Footer";

function App() {
    const [amount, setAmount] = useState("");

    async function sendReq(e, amount) {
        try {
            e.preventDefault();

            console.log(`Покупаем ${amount} ключей...`);

            const response = await fetch(
                "https://tough-clubs-attack.loca.lt/api/buy/keys",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount: +amount }),
                }
            );
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            console.log(response.status);
            const data = await response.json();
            console.log(data);
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="App">
            <div className="page-wrapper">
                <Header />
                <main className="content">
                    <h1 className="content__title">
                        Мгновенный обмен <br /> ключей и билетов{" "}
                        <span style={{ color: "orange" }}>TF2</span>
                    </h1>
                    <p className="content__desc">
                        Быстрый, безопасный и автоматический сервис <br /> для
                        покупки и продажи ключей Mann Co. <br /> без скрытых
                        комиссий
                    </p>
                    <form
                        className="keyForm"
                        onSubmit={(e) => sendReq(e, amount)}
                    >
                        <div className="purchase-selector">
                            <button className="purchase-selector__button">
                                Купить
                            </button>
                            <button className="purchase-selector__button">
                                Продать
                            </button>
                        </div>
                        <div className="purchase-selector__money">
                            <div className="purchase-selector__money-left">
                                <span>Вы платите</span>
                                <input
                                    className="keyForm__input"
                                    type="text"
                                    placeholder="Сумма"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="purchase-selector__money-right">
                                <span>Валюта</span>
                                <select className="Select">
                                    <option className="Option" value="RUB">
                                        RUB
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="purchase-selector__money">
                            <div className="purchase-selector__money-left">
                                <span>Вы получите</span>
                                <input
                                    className="keyForm__input"
                                    type="text"
                                    placeholder="Кол-во"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="purchase-selector__money-right">
                                <select className="Select">
                                    <option className="Option"></option>
                                </select>
                            </div>
                        </div>
                        <button className="keyForm__submit-btn" type="submit">
                            Купить
                        </button>
                    </form>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
