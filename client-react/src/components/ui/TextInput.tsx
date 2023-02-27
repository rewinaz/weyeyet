import { HTMLInputTypeAttribute, useState } from "react";

type Props = {
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
  value: string;
  className?: string;
  onInput: (value: string) => void;
};

const TextInput = ({
  placeholder = "",
  required = false,
  type = "text",
  className = "",
  value,
  onInput,
}: Props) => {
  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length >= 0) {
      onInput(e.currentTarget.value.trim());
    }
  };
  return (
    <input
      className={`bg-transparent outline-none border-2 border-white rounded-lg p-2 w-full transition duration-300 ease-in-out focus:border-bc-violet-900 text-white ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      onInput={handleOnInput}
    />
  );
};

export default TextInput;
