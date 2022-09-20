import classNames from "classnames";

type Props = JSX.IntrinsicElements["input"] & {
  label: string;
  hasError?: boolean;
  errorMessage?: string;
};

const TextInput: React.FC<Props> = ({
  label,
  hasError,
  errorMessage,
  ...rest
}) => {
  return (
    <div>
      <label
        className={classNames("font-sans text-sm", {
          "text-slate-900": !hasError,
          "text-red-500": hasError,
        })}
      >
        {label}
      </label>
      <input
        className={classNames(
          "h-10 mt-3 border w-full rounded-md px-4 font-sans text-sm text-slate-900 placeholder-slate-400",
          {
            "border-slate-200": !hasError,
            "border-red-500": hasError,
          }
        )}
        {...rest}
      />
      {hasError && (
        <p className="text-xs font-sans text-red-500 mt-3">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextInput;
