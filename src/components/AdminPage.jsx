import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [openTabs, setOpenTabs] = useState({
    halls: true,
    config: false,
    prices: false,
    seances: false,
    sales: false,
  });
  const [seanceToDelete, setSeanceToDelete] = useState(null);

  const toggleTab = (tabName) => {
    setOpenTabs((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  const confirmDeleteSeance = () => {
    console.log("Удаляем сеанс ID:", seanceToDelete);
    setSeanceToDelete(null);
  };

  return (
    <main className="conf-steps">
      <header className="page-header">
        <h1
          className="page-header__logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          ИДЁМ<span>ВКИНО</span>
        </h1>
      </header>

      <div className="conf-steps__wrapper">
        <section className="conf-step">
          <header
            className={`conf-step__header ${openTabs.halls ? "conf-step__header_opened" : "conf-step__header_closed"}`}
            onClick={() => toggleTab("halls")}
          >
            <h2 className="conf-step__title">Управление залами</h2>
          </header>
          {openTabs.halls && (
            <div className="conf-step__wrapper">
              <p className="conf-step__paragraph">Доступные залы:</p>
              {/* Тут ваш код вывода залов */}
              <button className="conf-step__button conf-step__button-accent">
                Создать зал
              </button>
            </div>
          )}
        </section>
        <section className="conf-step">
          <header
            className={`conf-step__header ${openTabs.config ? "conf-step__header_opened" : "conf-step__header_closed"}`}
            onClick={() => toggleTab("config")}
          >
            <h2 className="conf-step__title">Конфигурация залов</h2>
          </header>
          {openTabs.config && (
            <div className="conf-step__wrapper">
              <p className="conf-step__paragraph">Выберите зал для настройки</p>
            </div>
          )}
        </section>

        <section className="conf-step">
          <header
            className={`conf-step__header ${openTabs.seances ? "conf-step__header_opened" : "conf-step__header_closed"}`}
            onClick={() => toggleTab("seances")}
          >
            <h2 className="conf-step__title">Сетка сеансов</h2>
          </header>
          {openTabs.seances && (
            <div className="conf-step__wrapper">
              <p className="conf-step__paragraph">
                <button className="conf-step__button conf-step__button-accent">
                  Добавить фильм
                </button>
              </p>
              <div className="conf-step__seances">
                <button onClick={() => setSeanceToDelete(123)}>
                  Тест: Удалить сеанс
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {seanceToDelete && (
        <div className="popup active">
          <div className="popup__container">
            <div className="popup__content">
              <div className="popup__header">
                <h2 className="popup__title">Удаление сеанса</h2>
                <div
                  className="popup__dismiss"
                  onClick={() => setSeanceToDelete(null)}
                >
                  <img src="assets/svg/close.svg" alt="Закрыть" />
                </div>
              </div>
              <div className="popup__wrapper">
                <p className="conf-step__paragraph">
                  Вы действительно хотите удалить сеанс?
                </p>
                <div className="conf-step__buttons text-center">
                  <button
                    className="conf-step__button conf-step__button-regular"
                    onClick={() => setSeanceToDelete(null)}
                  >
                    Отменить
                  </button>
                  <button
                    className="conf-step__button conf-step__button-accent"
                    onClick={confirmDeleteSeance}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminPage;
