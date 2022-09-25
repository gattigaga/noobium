import Link from "next/link";
import { parseISO, format } from "date-fns";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";

type Props = {
  title: string;
  content: string;
  editURL?: string;
  url: string;
  thumbnail: string;
  category: string;
  date: string;
  author: {
    name: string;
    photo: string;
  };
  hasOptions?: boolean;
  onClickDelete?: () => void;
};

const Article: React.FC<Props> = ({
  title,
  content,
  editURL,
  url,
  thumbnail,
  category,
  date,
  author,
  hasOptions,
  onClickDelete,
}) => {
  const formattedDate = format(parseISO(date), "MMM dd");

  return (
    <div className="border-b border-slate-200 py-8">
      <div className="flex items-center">
        <img
          className="w-6 h-6 object-cover rounded-full mr-2"
          src={author.photo}
          alt={author.name}
        />
        <p className="font-sans text-sm text-slate-900">{author.name}</p>
        <div className="w-[2px] h-[2px] rounded-full bg-slate-400 mx-2" />
        <p className="font-sans text-sm text-slate-400">{formattedDate}</p>
      </div>

      <div className="flex items-center mb-8">
        <div className="mr-10">
          <Link href={url}>
            <a>
              <h1 className="font-sans text-slate-900 font-semibold text-2xl mb-4">
                {title}
              </h1>
            </a>
          </Link>
          <p className="font-serif text-slate-900 text-sm">{content}</p>
        </div>
        <img className="w-32 h-32 object-cover" src={thumbnail} alt={title} />
      </div>

      <div className="flex items-center justify-between">
        <div className="h-6 bg-slate-200 px-3 flex items-center w-fit rounded-full">
          <p className="text-slate-900 font-sans text-xs">{category}</p>
        </div>

        {hasOptions && (
          <div className="flex items-center">
            <Link href={editURL || ''}>
              <a>
                <button className="mr-6" type="button">
                  <MdOutlineModeEdit className="text-2xl text-slate-900" />
                </button>
              </a>
            </Link>
            <button type="button" onClick={onClickDelete}>
              <MdDeleteOutline className="text-2xl text-red-500" />
            </button>
            <div className="w-[168px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
