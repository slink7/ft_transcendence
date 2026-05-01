import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MenuButton() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <button className="cursor-pointer text-black-800 transition hover:text-dark-red-600" onClick={() => navigate("/")}>
            <div className="py-2 px-4 text-7xl sm:text-4xl text-shadow-sm font-vintage">
		        {t('navbar.title')}
		    </div>
        </button>
    );
}
