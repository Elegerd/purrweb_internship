import React, { useEffect, useRef, useState, MouseEvent } from "react";
import Textarea from "commonComponents/textarea/Textarea";
import "./textareagroup.css";

type Props = {
  value: string;
  titleButton: string;
  placeholder: string;
  onClick: (value: string) => void;
};

const TextareaGroup: React.FunctionComponent<Props> = ({
  value,
  titleButton,
  placeholder,
  onClick,
}) => {
  const textareaGroup = useRef();
  const [valueTextarea, setValueTextarea] = useState(value);

  useEffect(() => {
    document.addEventListener("click", handleOnClickContains, false);
    return () => {
      document.removeEventListener("click", handleOnClickContains, false);
    };
  });

  const handleOnClickContains = (e: MouseEvent) => {
    if (textareaGroup.current && !textareaGroup.current.contains(e.target)) {
      setValueTextarea("");
      onClick(valueTextarea);
    }
  };

  const handleOnKeyPress = () => {
    setValueTextarea("");
    onClick(valueTextarea);
  };

  const handleOnClick = () => {
    setValueTextarea("");
    onClick(valueTextarea);
  };

  const handleOnChangeValue = (value: string) => setValueTextarea(value);

  return (
    <div ref={textareaGroup} className={"textarea-group"}>
      <Textarea
        value={valueTextarea}
        placeholder={placeholder}
        onKeyPress={handleOnKeyPress}
        onChangeValue={handleOnChangeValue}
        autoFocus={false}
      />
      <div className={"textarea-group__container-button"}>
        <button className={"btn btn-success"} onClick={handleOnClick}>
          {titleButton}
        </button>
      </div>
    </div>
  );
};

TextareaGroup.defaultProps = {
  value: "",
  titleButton: "Принять",
  placeholder: "",
  onClick: () => {},
};

export default TextareaGroup;
