import Text from "../../Components/Text/Text.jsx";
import {THEMES} from "../../Context/ThemeContext/ThemeContext.jsx";
import useThemeContext from "../../Context/ThemeContext/useThemeContext.jsx";
import "./main.scss"
import Select from "react-select";
import Button from "../../Components/Button/Button.jsx";
export default function Main() {
    const {theme, handleToggleTheme} = useThemeContext();
    
    const languageOptions = [
        { value: 'english', label: 'English'},
        { value: 'japanese', label: 'Japanese'},
        { value: 'chinese', label: 'Chinese'},
        { value: 'french', label: 'French'}
    ]
    const skills = [
        { value: 'reading', label: 'Reading'},
        { value: 'listening', label: 'Listening'},
        { value: 'speaking', label: 'Speaking'}
    ]

    return (
        <>


            <div className="main">
                <div className='container-input'>
                    <div className="title">

                        <Text heading bold>Tell us about your language learning journey</Text>
                        <Text italicize>We'll use this to cater to your learning needs</Text>
                    </div>

                    <div className="field-group">
                        <div className="input-group">
                            <label><Text small>Language</Text></label>
                            <Select options={languageOptions} />
                        </div>

                        <div className="input-group">
                            <label><Text small>Skills</Text></label>
                            <Select options={skills} />
                        </div>

                        <Button  ><Text color="white" bold>Begin</Text> </Button>
                    </div>

                </div>

                <div className="container-hero">
                    <img alt="Photo of mountain" src="https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </div>





            </div>

        </>
    )

}

