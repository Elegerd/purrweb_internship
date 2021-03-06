import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "components/header/Header";
import Board from "components/board/Board";
import Popup from "commonComponents/popup/Popup";
import { getAuth } from "selectors/authSelector";
import { setName } from "routines/index";
import "./app.css";

const App: React.FunctionComponent = () => {
  const nameInput = useRef<HTMLInputElement>(null);
  const [isOpenModalName, setIsOpenModalName] = useState(false);

  const dispatch = useDispatch();
  const { name }: AuthState = useSelector(getAuth);

  useEffect(() => {
    if (!name) setIsOpenModalName(true);
  }, []);

  const handleOnSubmit = () => {
    const name = nameInput.current?.value || "Guest";
    setIsOpenModalName(false);
    dispatch(setName(name));
  };

  const handleOnClickLogout = () => {
    dispatch(setName(null));
    setIsOpenModalName(true);
  };

  const renderPopupName = () => {
    return (
      isOpenModalName && (
        <Popup>
          <div className={"popup__modal-name"}>
            <div className={"modal-name__header"}>
              <h2>Введите имя</h2>
            </div>
            <div className={"modal-name__content"}>
              <input ref={nameInput} />
              <button className={"btn btn-secondary"} onClick={handleOnSubmit}>
                Принять
              </button>
            </div>
          </div>
        </Popup>
      )
    );
  };

  return (
    <>
      <Header name={name} onClickLogout={handleOnClickLogout} />
      <main>
        <Board title={"Основная доска"} />
      </main>
      {renderPopupName()}
    </>
  );
};

export default App;
