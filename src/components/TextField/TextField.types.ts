export interface TextFieldProps {
  placeholder: string;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  maxLength: number;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
