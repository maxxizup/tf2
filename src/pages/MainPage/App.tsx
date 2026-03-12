import { Header } from "@/components/Header/Header";
import "./App.css";
import { useEffect, useState } from "react";
// import { Footer } from "@/components/Footer/Footer";
import { TradeForm } from "@/components/TradeForm/TradeForm";
import { Loader } from "@/components/Loader/Loader";
import { Modal } from "@/components/Modal/Modal";

type ItemType = "key" | "ticket";
type TradeType = "buy" | "sell";

interface PricesType {
    key: number | null;
    ticket: number | null;
}

function App() {
    // Количество ключей
    const [amount, setAmount] = useState<number | "">("");
    // Цена за 1 единицу
    const [prices, setPrices] = useState<PricesType>({
        key: 120,
        ticket: 46,
    });
    // Итоговая стоимость
    const [cost, setCost] = useState<number | "">("");
    // Загрузка
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // Модалка
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // Текущая позиция к покупке/продаже
    const [selectedItem, setSelectedItem] = useState<ItemType>("key");
    // Выбранный тип операции (покупка или продажа)
    const [tradeType, setTradeType] = useState<TradeType>("buy");

    const URL = "https://fluffy-squids-argue.loca.lt";

    // Получаем цену с сервака
    useEffect(() => {
        getPrices();
    }, []);

    // Калькулируем цену в зависимости от кол-ва нужных ключей/билетов
    useEffect(() => {
        const currentPrice = prices[selectedItem];

        if (typeof amount === "number" && typeof currentPrice === "number") {
            const roundedPrice = Number(currentPrice.toFixed(2)); // Округленная цена за 1шт
            const calculatedCost = Number((roundedPrice * amount).toFixed(2)); // Округленая итоговая стоимость
            setCost(calculatedCost);
        } else {
            setCost("");
        }
    }, [amount, prices, selectedItem]);

    async function getPrices() {
        setIsLoading(true);

        try {
            const response = await fetch(`${URL}/api/get-price`); // давай

            if (!response.ok) {
                throw new Error("Ошибка получения цены");
            }

            const data = await response.json();
            const receivedPrices = { key: data.key, ticket: data.ticket }; // Цены ключа и билета с апишки стима
            const resultKeyPrice = receivedPrices.key; // Итоговая цена за ключ
            const resultTicketPrice = receivedPrices.ticket; // Итоговая цена за билет

            setPrices({
                key: resultKeyPrice,
                ticket: resultTicketPrice,
            });
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function buyHandler() {
        setIsLoading(true);

        try {
            console.log(
                `Покупаем ${selectedItem === "key" ? "ключи" : "билеты"}... Кол-во: ${amount}`
            );

            const endPoint = selectedItem === "key" ? "keys" : "tickets";

            const response = await fetch(`${URL}/api/buy/${endPoint}`, {
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

            setIsModalOpen(false);
            setAmount("");
            console.log(
                `Успешно куплено ${amount} ${selectedItem === "key" ? "ключей" : "билетов"}!`
            );
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    async function sellHandler() {
        setIsLoading(true);

        try {
            console.log(
                `Продаем ${amount} ${selectedItem === "key" ? "ключей" : "билетов"}...`
            );

            const endpoint = selectedItem === "key" ? "keys" : "tickets";

            const response = await fetch(`${URL}/api/sale/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: +amount }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setIsModalOpen(false);
            setAmount("");
            alert(
                `Успешно продано ${amount} ${selectedItem === "key" ? "ключей" : "билетов"}!`
            );
        } catch (e: any) {
            console.error(e.message);
            alert(`Ошибка при продаже: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    function handleOpenModal(itemType: ItemType, purchaseType: TradeType) {
        setIsModalOpen(true);
        setSelectedItem(itemType);
        setTradeType(purchaseType);
        setAmount("");
        setCost("");
    }

    const getCurrentPrice = (itemType: ItemType): string => {
        const price = prices[itemType];
        return price ? price.toFixed(2) : "...";
    };

    return (
        <div className="App">
            <div className="container">
                <div className="page-wrapper">
                    <Header />
                    <main
                        className="content"
                        style={
                            isLoading && !isModalOpen
                                ? { justifyContent: "center" }
                                : undefined
                        }
                    >
                        {isLoading && !isModalOpen ? (
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
                                    <br /> без скрытых комиссий
                                </p>
                                <div className="cardGroup">
                                    <div className="cardItem">
                                        <h3 className="cardTitle">
                                            Ключ Манн Ко
                                        </h3>
                                        <img
                                            src="/src/assets/key.png"
                                            alt="key"
                                            className="cardImg"
                                        />
                                        <p className="cardItemDesc">
                                            Цена за 1 ключ: Покупка:{" "}
                                            {getCurrentPrice("key")}₽ Продажа:{" "}
                                            {/*{getCurrent}*/}
                                        </p>
                                        <div className="cardBtnsGroup">
                                            <button
                                                className="cardBtn"
                                                onClick={() =>
                                                    handleOpenModal(
                                                        "key",
                                                        "buy"
                                                    )
                                                }
                                            >
                                                Купить
                                            </button>
                                            <button
                                                className="cardBtn"
                                                onClick={() =>
                                                    handleOpenModal(
                                                        "key",
                                                        "sell"
                                                    )
                                                }
                                            >
                                                Продать
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cardItem">
                                        <h3 className="cardTitle">Билет</h3>
                                        <img
                                            src="/src/assets/ticket.png"
                                            alt="key"
                                            className="cardImg_ticket"
                                        />
                                        <p className="cardItemDesc">
                                            Цена за 1 билет:{" "}
                                            {getCurrentPrice("ticket")}₽
                                        </p>
                                        <div className="cardBtnsGroup">
                                            <button
                                                className="cardBtn"
                                                onClick={() =>
                                                    handleOpenModal(
                                                        "ticket",
                                                        "buy"
                                                    )
                                                }
                                            >
                                                Купить
                                            </button>
                                            <button
                                                className="cardBtn"
                                                onClick={() =>
                                                    handleOpenModal(
                                                        "ticket",
                                                        "sell"
                                                    )
                                                }
                                            >
                                                Продать
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </main>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <TradeForm
                                amount={amount}
                                setAmount={setAmount}
                                purchaseHandler={
                                    tradeType === "buy"
                                        ? buyHandler
                                        : sellHandler
                                }
                                cost={cost}
                                setCost={setCost}
                                selectedItem={selectedItem}
                                tradeType={tradeType}
                                currentPrice={getCurrentPrice(selectedItem)}
                            />
                        )}
                    </Modal>
                    {/*<Footer />*/}
                </div>
            </div>
        </div>
    );
}

export default App;
