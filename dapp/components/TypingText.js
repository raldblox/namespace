import React, { useEffect, useState } from "react";
import "animate.css";

const TypingText = ({ result }) => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(100 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["space", "defi", "ai", "dao", "nft", "chain", "web3", "doge", "ph"];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(300);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    return (
        <div className="flex flex-col items- gap-5">
            <h1 className="text-4xl font-bold">
                <span className="txt-rotate px-4 py-2" dataPeriod="1000" data-rotate={toRotate}>
                    <span className="wrap">name.{text}</span>
                </span>
            </h1>
        </div>
    );
};

export default TypingText;
