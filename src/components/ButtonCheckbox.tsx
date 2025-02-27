import React from "react";

interface ButtonCheckboxProps {
  htmlFor: string;
  id: string;
  value: string;
  label: string;
  onChange: any
}

const ButtonCheckbox: React.FC<ButtonCheckboxProps> = ({
  htmlFor,
  id,
  value,
  label,
  onChange,
}) => {
  return (
    <div className="border border-amber-400">
      <input
        type="checkbox"
        id={id}
        value={value}
        className="peer hidden"
        onChange={onChange}
      />
      <label
        htmlFor={htmlFor}
        className="select-none cursor-pointer border border-amber-900 py-3 px-6 font-bold transition-colors duration-200 ease-in-out 
        peer-checked:bg-red-300 peer-checked:text-gray-900 peer-checked:border-black-200"
      >
        {label}
      </label>
    </div>
  );
};

export default ButtonCheckbox;
