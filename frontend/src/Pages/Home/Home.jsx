import "./_home.scss"
import Text from "../../Components/Text/Text.jsx";
import Button from "../../Components/Button/Button.jsx";
import useThemeContext from "../../Context/ThemeContext/useThemeContext.jsx";
import {THEMES} from "../../Context/ThemeContext/ThemeContext.jsx";
import {useNavigate} from "react-router";

export default function Home() {
    const {theme, handleToggleTheme} = useThemeContext();
    const navigate = useNavigate();

    return (
        <>
            <div className="theme-icon">
                {
                    theme === THEMES.light ?
                        <div onClick={handleToggleTheme} className="material-symbols-outlined theme">dark_mode</div> :
                        <div onClick={handleToggleTheme} style={{color: "white"}} className="material-symbols-outlined theme">light_mode</div>

                }
            </div>
            <div className="home">
                <div className="home__intro">
                    <div className="home__intro__logo">
                        <Text large heading centered bold>Lerna</Text>
                    </div>
                    <div className="home__intro__description">

                        <Text italicize>
                            An AI powered language learning app to accelerate your listening and reading skills through
                            practical application
                        </Text>
                    </div>
                    <div className="home__intro__button">
                        <Button onClick={() => navigate('/main')}><Text>Start learning</Text></Button>
                    </div>

                </div>
            </div>
        </>
    )
}