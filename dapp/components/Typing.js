import React, { useEffect, useState } from "react";
import "animate.css";

const Typing = ({ result }) => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(200 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["name >>> wallet address replacement", "name.space >>> community space and identity", "sub.name.space >>> shorten links", "name.space/folder/book.pdf >>> file system"];
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
        <h1 className="text-4xl font-bold">
            <span className="txt-rotate bg-black text-white px-4 py-2" dataPeriod="1000" data-rotate={toRotate}>
                <span className="wrap">{text}|</span>
            </span>
        </h1>
    );
};

export default Typing;
