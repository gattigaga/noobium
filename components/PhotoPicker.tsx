import { ChangeEvent, useRef, useState, useEffect } from "react";
import { MdOutlineImage } from "react-icons/md";

type Props = {
  preview?: string;
  onPick?: (file: File) => void;
};

const PhotoPicker: React.FC<Props> = ({ preview, onPick }) => {
  const [src, setSrc] = useState("");
  const refInput = useRef<HTMLInputElement>(null);

  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setSrc(e.target?.result as string);

      if (event.target.files?.[0]) {
        onPick?.(event.target.files[0]);
      }
    };

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (preview) {
      setSrc(preview);
    }
  }, [preview]);

  return (
    <div
      className="w-40 h-40 bg-slate-200 flex items-center justify-center rounded-full cursor-pointer"
      onClick={() => {
        refInput.current?.click();
      }}
    >
      {!!src && (
        <img className="w-full h-full object-cover rounded-full" src={src} alt="Preview" />
      )}

      {!src && <MdOutlineImage className="text-7xl text-slate-400" />}

      <input
        ref={refInput}
        className="hidden"
        type="file"
        accept="image/png,image/jpeg"
        onChange={pick}
      />
    </div>
  );
};

export default PhotoPicker;
