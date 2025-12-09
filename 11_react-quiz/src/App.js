import Header from "./components/Header";
import {useEffect, useReducer} from "react";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            }
        default:
            throw new Error('Unknown action');
    }
}

export default function App() {
    const [{questions, status}, dispatch] = useReducer(reducer, initialState)

    const numQuestions = questions.length;

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => dispatch({type: 'dataReceived', payload: data}))
            .catch((err) => dispatch({type: 'dataFailed'}));
    }, []);

    return (
        <div className="app">
            <Header/>
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <StartScreen numQuestions={numQuestions}/>}
                {status === 'ready' && <StartScreen
                    numQuestions={numQuestions}
                    dispatch={dispatch}
                />}
            </Main>
        </div>
    );

}