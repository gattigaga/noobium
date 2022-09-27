import classnames from "classnames";

type Props = {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const Category: React.FC<Props> = ({ label, isSelected, onClick }) => {
  return (
    <button
      className={classnames("h-8 rounded-full px-4 text-sm font-sans", {
        "bg-slate-200": !isSelected,
        "bg-blue-800": isSelected,
        "text-slate-900": !isSelected,
        "text-white": isSelected,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Category;
