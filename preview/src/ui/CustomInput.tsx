import type { ChangeEvent, CSSProperties } from 'react';

interface CustomInputProps {
  style?: CSSProperties;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  style,
  placeholder,
  value,
  onChange,
}: CustomInputProps) => (
  <input
    type="text"
    style={style}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default CustomInput;
