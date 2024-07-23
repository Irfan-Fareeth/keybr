import React, { useEffect, useState, useRef } from 'react';

const Wpm = (props) => {
    let [isRunning, setIsRunning] = useState(false);
    let [elapsedTime, setElapsedTime] = useState(0);
    let intervalIdRef = useRef(null);
    let startTimeRef = useRef(0);

    const targetTextLength = props.targetText.length;

    let [wordsPerMinute, setWordsPerMinute] = useState(0);
    let [accuracy, setAccuracy] = useState(0); // Initialize accuracy to 0
    let [averagewpm, setAveragewpm] = useState(0);

    const updateAverageWpm = async (value) => {
        try {
            const body = { value, accuracy };
            await fetch(
                `http://localhost:3000/updateAverageWpm`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
        } catch (err) {
            console.error(err.message);
        }
    };

    const getAverageWpm = async () => {
        try {
            const response = await fetch("http://localhost:3000/getaveragewpm");
            const jsonData = await response.json();
            const average = jsonData[0].averagewpm;
            setAveragewpm(average.toFixed(2));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (props.start) {
            start();
        } else {
            stop();
            calculateWpm(elapsedTime);
            calculateAccuracy(props.correctLetters, props.wrongLetters);
            reset();
        }
    }, [props.start]);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
        clearInterval(intervalIdRef.current);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
        clearInterval(intervalIdRef.current);
    }

    function calculateWpm(elapsedTime) {
        const timeInMinutes = elapsedTime / 60000;
        const wordsTyped = targetTextLength / 5;
        const wpm = wordsTyped / timeInMinutes;
        setTimeout(() => {
            updateAverageWpm(wpm.toFixed(2));
            if (wpm !== Infinity) {
                setWordsPerMinute(wpm.toFixed(2));
            }
            getAverageWpm();
        }, 1000);
    }

    function calculateAccuracy(correctLetters, wrongLetters) {
        const totalKeystrokes = correctLetters + wrongLetters;
        if(correctLetters!=0)
        {
            if (totalKeystrokes > 0) {
                const accuracyPercentage = (correctLetters / totalKeystrokes) * 100;
                setTimeout(() => {
                    setAccuracy(accuracyPercentage.toFixed(2));
                }, 1000);
            } else {
                setTimeout(() => {
                    setAccuracy(0); // Default to 0% accuracy if no keystrokes are recorded
                }, 1000);
            }
        }
    }

    return (
        <div className='wpm'>
            <div className='wpm'>
                wpm: {wordsPerMinute} || accuracy: {accuracy}% || averagewpm: {averagewpm}
            </div>
        </div>
    );
}

export default Wpm;
