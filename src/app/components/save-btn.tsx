import { Bookmark } from "lucide-react";
import { saveTranslation } from "../actions/save-translation";

interface SaveBtnProps {
  sourceLan: string;
  targetLan: string;
  sourceText: string;
  targetText: string;
  isSaved: boolean;
  onHandleSave: () => void;
}

export default function SaveBtn({
  sourceLan,
  targetLan,
  sourceText,
  targetText,
  isSaved,
  onHandleSave,
}: SaveBtnProps) {
  const btnClasses = isSaved ? "fill-yellow-500" : "";

  return (
    <button
      type="button"
      onClick={async () => {
        await saveTranslation(sourceLan, targetLan, sourceText, targetText);
        onHandleSave();
      }}
    >
      <Bookmark className={btnClasses} />
    </button>
  );
}
