import { ChangeEvent, useRef, useState, useEffect } from "react";
import { MdOutlineImage } from "react-icons/md";

type Props = {
  preview?: string
  onPick?: (file: File) => void;
};

const ThumbnailPicker: React.FC<Props> = ({ preview, onPick }) => {
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
      setSrc(preview)
    }
  }, [preview])

  return (
    <div
      className="w-full aspect-video bg-slate-200 flex flex-col items-center justify-center cursor-pointer"
      onClick={() => {
        refInput.current?.click();
      }}
    >
      {!!src && (
        <img className="w-full h-full object-cover" src={src} alt="Preview" />
      )}

      {!src && (
        <>
          <MdOutlineImage className="text-9xl text-slate-400 mb-10" />
          <p className="font-sans text-slate-400 text-center">
            Upload a Thumbnail
          </p>
        </>
      )}

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

export default ThumbnailPicker;
