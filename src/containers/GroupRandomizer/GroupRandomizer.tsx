import { useTranslation } from "react-i18next";


const GroupRandomizer = () => {
    const { t } = useTranslation();

    return <div>{t("GroupRandomizer.title")}</div>;
}

export default GroupRandomizer;