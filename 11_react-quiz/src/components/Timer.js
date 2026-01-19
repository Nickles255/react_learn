import React, {useEffect} from 'react';
import {useQuiz} from "../context/QuizContext";


function Timer() {
    const { secondsRemaining, tickTime } = useQuiz();
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(function() {
       const id = setInterval(
            function () {
                // console.log("tick");
                tickTime();
            }, 1000);

            return () => clearInterval(id);
    }, []);

    return (
        <div className="timer">
            {mins < 10 && "0"}{mins}:
            {seconds < 10 && "0"}{seconds}
        </div>
    );
}

export default Timer;