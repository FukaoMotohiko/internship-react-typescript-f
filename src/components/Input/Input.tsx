import React, { useState } from "react";
import type { Task } from "../../types/task";
import "./Input.css";

interface InputProps {
    onSubmit: (title: Task['title']) => void;
};

export const Input:React.FC <InputProps> = ({ onSubmit }) => {
    const [input, setInput] = useState<string>("");

    const handleSubmit = () => {
        if (!input) return;
        onSubmit(input);
        setInput("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }
    return <div className="container">
        <input type="text" className="input"
        value={input} 
        onChange={handleChange}/>
        <button onClick={handleSubmit} className="button">Add</button>
    </div>;
};