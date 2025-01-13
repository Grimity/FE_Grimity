import styles from "./TextField.module.scss";
import { TextFieldProps } from "./TextField.types";

export default function TextField({
  placeholder,
  label,
  isError,
  errorMessage,
  maxLength,
  value,
  onChange,
}: TextFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.inputContainer} ${isError && styles.error}`}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
        {value && (
          <p className={styles.countTotal}>
            <p className={styles.count}>{value.length}</p>/{maxLength}
          </p>
        )}
      </div>
      {isError && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}
