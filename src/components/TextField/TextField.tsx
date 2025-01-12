import { useState } from "react";
import styles from "./TextField.module.scss";
import { TextFieldProps } from "./TextField.types";

export default function TextField({
  placeholder,
  label,
  isError,
  errorMessage,
  maxLength,
}: TextFieldProps) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.inputContainer} ${isError && styles.error}`}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          maxLength={maxLength}
        />
        <p className={styles.countTotal}>
          <p className={styles.count}>{inputValue.length}</p>/{maxLength}
        </p>
      </div>
      {isError && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}
