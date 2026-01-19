import {createContext, useContext, useEffect, useReducer} from "react";

const BASE_URL = "http://localhost:8000";
const initialState = {
    questions: [],
    numQuestions: 0,
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    question: [],
    answer: null,
    points: 0,
    maxPossiblePoints: 0,
    highscore: 0,
    secondsRemaining: null,
}
const SECS_PER_QUESTION = 15;

const QuizContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                numQuestions: action.payload.length,
                maxPossiblePoints: action.payload.reduce((acc, curr) => acc + curr.points, 0),
                status: 'ready',
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            };
        case 'start':
            return {
                ...state,
                status: 'active',
                question: state.questions[state.index],
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case 'newAnswer':
            return {
                ...state,
                answer: action.payload,
                points: action.payload === state.question.correctOption
                    ? state.points + state.question.points
                    : state.points,
            };
        case 'nextQuestion':
            return {...state, index: state.index + 1, question: state.questions[state.index + 1], answer: null};
        case 'finish':
            return {
                ...state, status: 'finished',
                question: [],
                highscore: state.points > state.highscore ? state.points : state.highscore
            };
        case 'reset':
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
            };
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished' : state.status,
                highscore: state.secondsRemaining === 0 ? Math.max(state.points, state.highscore) : state.highscore,
            }
        default:
            throw new Error('Unknown action');
    }
}


function QuizProvider({children}) {
    const [{
        questions,
        numQuestions,
        status,
        index,
        question,
        answer,
        points,
        maxPossiblePoints,
        highscore,
        secondsRemaining
    }, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`${BASE_URL}/questions`)
            .then((res) => res.json())
            .then((data) => dispatch({type: 'dataReceived', payload: data}))
            .catch((err) => dispatch({type: 'dataFailed'}));
    }, []);

    function startQuiz() {
        dispatch({type: 'start'});
    }
    function tickTime() {
        dispatch({type: "tick"});
    }
    function newAnswer(optionIndex) {
        dispatch({ type: 'newAnswer', payload: optionIndex });
    }

    function nextQuestion() {
        dispatch({ type: 'nextQuestion' });
    }

    function finishQuiz() {
         dispatch({ type: 'finish' });
    }

    function resetQuiz() {
        dispatch({ type: 'reset'});
    }

    return (
        <QuizContext.Provider
            value={{
                questions,
                numQuestions,
                status,
                index,
                question,
                answer,
                points,
                maxPossiblePoints,
                highscore,
                secondsRemaining,
                startQuiz,
                tickTime,
                newAnswer,
                nextQuestion,
                finishQuiz,
                resetQuiz,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error('useQuiz must be used within a QuizProvider');
    return context;
}

export {QuizProvider, useQuiz};