import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [apiData, setApiData] = useState({ films: [], halls: [], seances: [] });
  const [activeDay, setActiveDay] = useState(0); // 0 - Сегодня, 1 - Завтра и т.д.
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("client-mode");

    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setApiData(data.result);
        }
      })
      .catch((error) => console.error("Ошибка API:", error));

    return () => document.body.classList.remove("client-mode");
  }, []);

  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const dates = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      name: i === 0 ? "Сегодня" : days[d.getDay()],
      date: d.getDate(),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    };
  });

  // Функция проверки прошедшего времени (Срабатывает ТОЛЬКО для "Сегодня")
  const isTimePassed = (timeStr) => {
    if (activeDay !== 0) return false; // Если не "Сегодня", всё открыто
    const [h, m] = timeStr.split(":").map(Number);
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes() > h * 60 + m;
  };

  return (
    <div className="client-wrapper">
      <header className="client-header">
        <Link to="/" className="client-logo">
          ИДЁМ<span>ВКИНО</span>
        </Link>
        <button className="btn-login-cyan" onClick={() => navigate("/login")}>
          Войти
        </button>
      </header>

      <main>
        <nav className="days-menu">
          {dates.map((d, i) => (
            <div
              key={i}
              className={`days-menu__item ${activeDay === i ? "days-menu__item_active" : ""} ${d.isWeekend ? "days-menu__item_weekend" : ""}`}
              onClick={() => setActiveDay(i)} // Не используем Link, меняем только стейт!
            >
              <span className="days-menu__day">{d.name}</span>
              <span className="days-menu__date">{d.date}</span>
            </div>
          ))}
          <div className="days-menu__next">&gt;</div>
        </nav>

        <section className="movies">
          {apiData.films.map((film) => {
            const activeHalls = apiData.halls.filter(
              (h) =>
                h.hall_open === 1 &&
                apiData.seances.some(
                  (s) =>
                    s.seance_filmid === film.id && s.seance_hallid === h.id,
                ),
            );

            if (activeHalls.length === 0) return null;

            return (
              <div key={film.id} className="movies__section">
                <div className="movies__info">
                  <img
                    src={film.film_poster}
                    alt={film.film_name}
                    className="movies__img"
                  />
                  <div className="movies__description">
                    <h2 className="movies__title">{film.film_name}</h2>
                    <p className="movies__annotation">
                      {film.film_description}
                    </p>
                    <p className="movies__notes">
                      {film.film_duration} минут • {film.film_origin}
                    </p>
                  </div>
                </div>

                {activeHalls.map((hall) => {
                  const seances = apiData.seances
                    .filter(
                      (s) =>
                        s.seance_filmid === film.id &&
                        s.seance_hallid === hall.id,
                    )
                    .sort((a, b) => a.seance_time.localeCompare(b.seance_time));

                  return (
                    <div key={hall.id} className="movies__hall">
                      <h3 className="movies__hall-title">{hall.hall_name}</h3>
                      <div className="movies__start-time">
                        {seances.map((s) => {
                          const passed = isTimePassed(s.seance_time);
                          return (
                            <Link
                              key={s.id}
                              to={passed ? "#" : `/hall/${s.id}`}
                              className={`movies__btn_start-time ${passed ? "movies__btn_start-time-unavailable" : ""}`}
                              style={
                                passed
                                  ? {
                                      pointerEvents: "none",
                                      cursor: "not-allowed",
                                    }
                                  : {}
                              }
                              state={{ seance: s, film: film, hall: hall }}
                            >
                              {s.seance_time}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
