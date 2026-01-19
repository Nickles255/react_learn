import React from 'react';
import {useQuiz} from "../context/QuizContext";

function NextButton() {
    const {answer, index, numQuestions, nextQuestion, finishQuiz} = useQuiz();
    if (answer === null) return null;
    if ((index + 1) < numQuestions) return (
        <button
            className="btn btn-ui"
            onClick={() => nextQuestion()}
        >
            Next
        </button>
    );
    if ((index + 1) === numQuestions) return (
        <button
            className="btn btn-ui"
            onClick={() => finishQuiz()}
        >
            Next
        </button>
    );
}

export default NextButton;