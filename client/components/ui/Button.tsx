import React, {
  ButtonHTMLAttributes,
  FormEvent,
  FormEventHandler,
} from "react";

type Props = {
  value: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onSubmit?: FormEventHandler<HTMLButtonElement>;
};

const Button = ({ type, value, onClick, onSubmit }: Props) => {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-bc-m-darkblue transition duration-300 ease-in-out"
      onClick={(e) => {
        return onClick && onClick(e);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        return onSubmit && onSubmit(e);
      }}
    >
      {value}
    </button>
  );
};

export default Button;
