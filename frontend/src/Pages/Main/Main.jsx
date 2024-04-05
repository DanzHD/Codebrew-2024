import Text from "../../Components/Text/Text.jsx";
import {THEMES} from "../../Context/ThemeContext/ThemeContext.jsx";
import useThemeContext from "../../Context/ThemeContext/useThemeContext.jsx";
import "./main.scss"
import Select from "react-select";
import Button from "../../Components/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {
    BACKEND_ENDPOINT,
    CHINESE,
    ENGLISH,
    FRENCH,
    JAPANESE,
    LISTENING,
    READING,
    SPEAKING
} from "../../Util/Constants.jsx";
import "./_header.scss"
import "./_reading.scss"
import "./_listening.scss"
import TextArea from "../../Components/TextArea/TextArea.jsx";

const languageOptions = [
    { value: ENGLISH, label: ENGLISH},
    { value: JAPANESE, label: JAPANESE},
    { value: CHINESE, label: CHINESE},
    { value: FRENCH, label: FRENCH}
]
const skills = [
    { value: READING, label: READING},
    { value: LISTENING, label: LISTENING},
    { value: SPEAKING, label: SPEAKING}
]
export default function Main() {
    const {theme, handleToggleTheme} = useThemeContext();
    const [languageSelection, setLanguageSelection] = useState(null);
    const [skillSelection, setSkillSelection] = useState(null);
    const [invalidInput, setInvalidInput] = useState(false);
    const [skill, setSkill] = useState(null);

    const handleButtonSubmit = () => {
        if (!languageSelection || !skillSelection) {
            setInvalidInput(true);
            return;
        }


        setInvalidInput(false);
        setSkill(skillSelection.value)


    }

    const handleMarkAnswers = async (e, chatId) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        try {
            const options = {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    ...formJson,
                    "id": chatId
                })
            }
            const res = await fetch(`${BACKEND_ENDPOINT}/solutions`, options);
            const solutions = await res.json();
            return solutions;
        } catch (err) {
            console.error(err)
        }



    }

    const generateText = async ({ language }) => {
        const BACKEND_ENDPOINT = new URL("http://127.0.0.1:8000/text");
        BACKEND_ENDPOINT.searchParams.append("language", language);

        const res = await fetch(BACKEND_ENDPOINT.toString());
        return res.json();
    }

    if (skill === READING ) {

        return (
            <ReadingTest handleMarkAnswers={handleMarkAnswers} language={languageSelection} setSkill={setSkill} />
        )
    }

    if (skill === LISTENING) {
        return <ListeningTest handleMarkAnswers={handleMarkAnswers} generateText={generateText} language={languageSelection} setSkill={setSkill} />
    }

    if (skill === SPEAKING) {
        return <SpeakingPractice setSkill={setSkill} language={languageSelection} />
    }


    return (
        <FormSelection
            invalidInput={invalidInput}
            handleToggleTheme={handleToggleTheme}
            theme={theme}
            handleButtonSubmit={handleButtonSubmit}
            setSkillSelection={setSkillSelection}
            setLanguageSelection={setLanguageSelection}
        />
    )

}

function FormSelection({
    handleToggleTheme,
    theme,
    handleButtonSubmit,
    invalidInput,
    setSkillSelection,
    setLanguageSelection
}) {
    return (
        <>


            <div className="main">
                <div className='container-input'>
                    <div >
                        {
                            theme === THEMES.light ?
                                <div onClick={handleToggleTheme}
                                     className="material-symbols-outlined theme">dark_mode</div> :
                                <div onClick={handleToggleTheme} style={{color: "white"}}
                                     className="material-symbols-outlined theme">light_mode</div>

                        }
                    </div>
                    <div className="title">

                        <Text heading bold>Tell us about your language learning journey</Text>
                        <Text italicize>We'll use this to cater to your learning needs</Text>
                    </div>

                    <div className="field-group">
                        <div className="input-group">
                            <label><Text small>Language</Text></label>
                            <Select onChange={(language) => setLanguageSelection(language)} name="language" options={languageOptions}/>
                        </div>

                        <div className="input-group">
                            <label><Text small>Skills</Text></label>
                            <Select onChange={(skill) => setSkillSelection(skill)} name="Skills" options={skills}/>
                        </div>
                        {
                            invalidInput &&
                            <Text color="red">Invalid Input. Please fill out all fields!</Text>
                        }

                        <Button onClick={handleButtonSubmit}><Text color="white" bold>Begin</Text> </Button>
                    </div>

                </div>

                <div className="container-hero">
                    <img alt="Photo of mountain"
                         src="https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                </div>


            </div>

        </>
    )
}

function ReadingTest({
    language,
    setSkill,
    handleMarkAnswers
}) {
    const [passage, setPassage] = useState(null)
    const [questions, setQuestions] = useState([]);
    const [soluions, setSolutions] = useState([]);
    useEffect(() => {
        setPassage("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, " +
            "totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt " +
            "explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur " +
            "magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor " +
            "sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam " +
            "aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, " +
            "nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse " +
            "quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?")

            let sampleQuestions = [
                {
                    number: 1,
                    question: "What is a potato"
                },
                {
                    number: 2,
                    question: "What is a potato"
                },
                {
                    number: 3,
                    question: "What is a potato"
                },
                {
                    number: 4,
                    question: "What is a potato"
                },
                {
                    number: 5,
                    question: "What is a potato"
                },
                {
                    number: 6,
                    question: "What is a potato"
                },
            ]
            setQuestions(sampleQuestions);

    }, []);



    return (
        <>

            <Header setSkill={setSkill} skill={READING} />
            <div className="passage">
                <div className="passage__text">

                    <Text>{passage} </Text>
                </div>

                <form className="passage__questions" onSubmit={handleMarkAnswers}>
                    <Text bold>Based on the passage above, answer the following questions.</Text>
                    {
                        questions.map(question => {
                            return (
                                <div key={question['number']} className="question">
                                    <Text >{question['number']}. {question['question']}</Text>
                                    <TextArea name={question['number']} fullWidth></TextArea>
                                </div>
                            )
                        })
                    }
                    <div className="questions__submit">

                        <Button submit dynamicWidth >Mark Answer</Button>
                    </div>
                </form>

            </div>
        </>
    )

}

function ListeningTest({
    language,
    setSkill,
    generateText,
    handleMarkAnswers
}) {
    const [questions, setQuestions] = useState([]);
    const [solutions, setSolutions] = useState(null);
    const [audioURL, setAudioURL] = useState("");
    const [testId, setTestId] = useState(null);
    const audioRef = useRef(null);


    useEffect(() => {
        const getAudio = async () => {
            const BACKEND_ENDPOINT = new URL("http://127.0.0.1:8000/transcription");

            const text = await generateText({ language: language.value});
            setQuestions(text['questions'])
            setTestId(text.id)
            const res = await fetch(BACKEND_ENDPOINT.toString(), {
                headers: {
                    "content-type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    "language": language.value,
                    "text": text.text
                })
            });

            const audioBlob = await res.blob();
            const audioURL = URL.createObjectURL(audioBlob)

            setAudioURL(audioURL)

        }
        getAudio();

    }, []);

    useEffect(() => {
        audioRef.current.src = audioURL;

    }, [audioURL]);

    async function handleFormSubmit(e) {
        const s = await handleMarkAnswers(e, testId);
        console.log(s);
        setSolutions(s['answer'])
    }



    return (
        <>
            <Header setSkill={setSkill} skill={LISTENING} />

            <div className="play-audio">
                <audio ref={audioRef}  controls>
                    <source type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio>

            </div>

            <form onSubmit={handleFormSubmit} className="listening-questions">

                <Text bold>Based on the audio above, answer the following questions.</Text>
                {
                    questions.map((question, index) => {
                        return (
                            <div key={index + 1} className="question">
                                <Text>{index + 1}. {question}</Text>
                                <TextArea name={index} fullWidth></TextArea>
                                {
                                    solutions && <Text>{solutions[index]} </Text>

                                }
                            </div>
                        )
                    })
                }
                <div className="questions__submit">

                    <Button submit dynamicWidth> Mark Answers </Button>
                </div>
            </form>
        </>
    )
}

function SpeakingPractice({
    language,
    setSkill
}) {

    return (
        <>
            <Header setSkill={setSkill} skill={SPEAKING} />
            <Text>Speaking</Text>
        </>
    )
}

function Header({
    setSkill,
    skill
}) {
    return (
        <div className="header">
            <Text>LogoPlaceHolder</Text>
            <Text heading bold>{skill}</Text>
            <Button onClick={() => setSkill(null)}>Back</Button>
        </div>
    )
}