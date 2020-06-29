import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "@common_components/textarea/Textarea";
import TextareaGroup from "@common_components/textareaGroup/TextareaGroup";
import Card from "@components/card/Card";
import { addCard, patchColumn } from "@routines";
import { getAuth } from "@selectors/authSelector";
import { getColumnCards } from "@selectors/cardSelector";
import "./column.css";

const Column = ({ column }) => {
  const dispatch = useDispatch();
  const { name } = useSelector(getAuth);
  const cards = useSelector(getColumnCards(column));

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const onChangeColumn = (id, data) => dispatch(patchColumn({ id, data }));
  const onAddCard = (newCard) => dispatch(addCard(newCard));

  const handleOnClickCard = (value) => {
    if (value.length > 0)
      onAddCard({
        title: value,
        column_id: column.id,
        author: name,
        description: "",
      });
    setIsAddingCard(false);
  };

  const renderNewCard = () => {
    return (
      <TextareaGroup
        placeholder={"Ввести заголовок для этой карточки"}
        titleButton={"Добавить карточку"}
        onClick={handleOnClickCard}
      />
    );
  };

  const handleOnClickNewCard = (e) => {
    e.stopPropagation();
    setIsAddingCard(true);
  };

  return (
    <div className={"col column__wrapper"}>
      <div className={"column"}>
        <header className={"column__column-header"}>
          <Textarea
            value={column.title}
            isEdit={isEditTitle}
            onBlur={() => setIsEditTitle(false)}
            onKeyPress={() => setIsEditTitle(false)}
            onChangeValue={(value) =>
              onChangeColumn(column.id, { title: value })
            }
            onChangeIsEdit={(value) => setIsEditTitle(value)}
          />
        </header>
        <div className={"column__list-cards"}>
          {cards.map((card) => {
            return (
              <Card key={card.id} columnTitle={column.title} card={card} />
            );
          })}
        </div>
        <footer className={"column__column-footer"}>
          {isAddingCard ? (
            renderNewCard()
          ) : (
            <div
              className={"column-footer__button"}
              onClick={handleOnClickNewCard}
            >
              <input
                type={"button"}
                onClick={handleOnClickNewCard}
                value={"Добавить еще одну карточку"}
              />
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default Column;
