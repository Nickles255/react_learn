import React from 'react';
import {useQuiz} from "../context/QuizContext";

function Options() {
    const {question, answer, newAnswer} = useQuiz();
    const hasAnswer = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option 
                        ${index === answer ? "answer" : ""}
                        ${hasAnswer 
                            ? (index ===  question.correctOption) 
                                ? "correct" 
                                : "wrong"
                            : ""
                        }
                    `}
                    key={option}
                    disabled={hasAnswer}
                    onClick={() => newAnswer(index)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;