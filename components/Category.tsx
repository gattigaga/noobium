type Props = {
  label: string;
};

const Category: React.FC<Props> = ({ label }) => {
  return (
    <button className="h-8 bg-slate-200 rounded-full px-4 text-slate-900 text-sm font-sans">
      {label}
    </button>
  );
};

export default Category;
