import { useTranslation } from "@/lib/providers/LanguageProvider";
import CustomDecryptedText from "../ui/CustomDecryptedText";

const MainText = () => {
  const { t } = useTranslation();

  const textStart = t("main_text").split("~")[0];
  const textEnd = t("main_text").split("~")[1];
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <p className="text-xl">{textStart}</p>
      <div>
        <CustomDecryptedText
          text="Ondassyn Abdrakhmanov"
          secondText="Ондасын Абдрахманов"
          speed={70}
          parentClassName="text-5xl lg:text-6xl"
          useOriginalCharsOnly
        />
      </div>
      <p className="text-xl text-center tracking-wide">{textEnd}</p>
    </div>
  );
};

export default MainText;
