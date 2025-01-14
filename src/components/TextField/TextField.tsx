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
  color = "GRAY",
  required = false,
}: TextFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {required && <p className={styles.required}>*</p>}
        {label && <label className={styles.label}>{label}</label>}
      </div>
      <div className={`${styles.inputContainer} ${isError && styles.error}`}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
        {value && maxLength && (
          <p className={styles.countTotal}>
            <p className={`${color === "GRAY" ? styles.count : styles.countGreen}`}>
              {value.length}
            </p>
            /{maxLength}
          </p>
        )}
      </div>
      {isError && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}
