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
                        <Text heading centered>Placeholder</Text>
                    </div>
                    <div className="home__intro__description">

                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit

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