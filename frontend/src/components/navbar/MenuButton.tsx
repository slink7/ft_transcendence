import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MenuButton() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div>
            <button onClick={() => navigate("/")}>
                {t('navbar.home')}
            </button>
        </div>
    );
}
