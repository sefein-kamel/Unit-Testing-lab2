import "./Button.css";
export default function Button({
  children,
  onClick,
  ...restProps
}) {
  return (
    <button onClick={onClick}  {...restProps}>
      {children}
    </button>
  );
}
