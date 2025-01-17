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
  isUpload = false,
  isComment = false,
  onKeyDown,
}: TextFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div
      className={`${isComment ? styles.isCommentContainer : styles.container} ${
        isUpload ? styles.isUploadContainer : ""
      }`}
    >
      <div className={styles.labelContainer}>
        {required && <p className={styles.required}>*</p>}
        {label && (
          <label className={!isUpload ? styles.label : styles.isUploadLabel} htmlFor="label">
            {label}
          </label>
        )}
      </div>
      <div
        className={`${!isUpload ? styles.inputContainer : styles.isUploadInputContainer} ${
          !isComment ? styles.inputContainer : styles.isCommentInputContainer
        } ${isError && styles.error}`}
      >
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleEnter}
          maxLength={maxLength}
          id="label"
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
