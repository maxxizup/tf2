import { Header } from "@/components/Header/Header";
import "./App.css";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer/Footer";
import { TradeForm } from "@/components/TradeForm/TradeForm";
import { Loader } from "@/components/Loader/Loader";

function App() {
    // Количество ключей
    const [amount, setAmount] = useState<number | "">("");
    // Цена за 1 ключ
    const [price, setPrice] = useState<number | null>(120);
    // Итоговая стоимость
    const [cost, setCost] = useState<number | "">("");

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const URL = "https://full-states-shop.loca.lt";

    // Получаем цену с сервака
    useEffect(() => {
        getPrice();
    }, []);

    // Калькулируем цену в зависимости от кол-ва нужных ключей
    useEffect(() => {
        if (typeof amount === "number" && typeof price === "number") {
            const roundedPrice = Number(price.toFixed(2)); // Округленная цена за 1шт
            const calculatedCost = Number((roundedPrice * amount).toFixed(2)); // Округленая итоговая стоимость
            setCost(calculatedCost);
        } else {
            setCost("");
        }
    }, [amount, price]);

    async function getPrice() {
        setIsLoading(true);

        try {
            const response = await fetch(`${URL}/api/get-key-price`);

            if (!response.ok) {
                throw new Error("Ошибка получения цены");
            }

            const data = await response.json();
            const receivedPrice = data.price; // Цена ключа с апишки стима
            const resultPrice = receivedPrice * 0.78; // Итоговая цена за ключ

            setPrice(resultPrice);
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function buyKeys() {
        setIsLoading(true);

        try {
            console.log(`Покупаем ${amount} ключей...`);

            const response = await fetch(`${URL}/api/buy/keys`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: +amount }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            console.log(response.status);
            const data = await response.json();
            console.log(data);
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="App">
            <div className="page-wrapper">
                <Header />
                <main
                    className="content"
                    style={isLoading ? { justifyContent: "center" } : undefined}
                >
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <h1 className="content__title">
                                Мгновенный обмен <br /> ключей и билетов{" "}
                                <span style={{ color: "orange" }}>TF2</span>
                            </h1>
                            <p className="content__desc">
                                Быстрый, безопасный и автоматический сервис{" "}
                                <br /> для покупки и продажи ключей Mann Co.{" "}
                                <br /> без скрытых комиссий 77.35.47.116
                            </p>
                            <TradeForm
                                amount={amount}
                                setAmount={setAmount}
                                buyKeys={buyKeys}
                                cost={cost}
                                setCost={setCost}
                            />
                        </>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
