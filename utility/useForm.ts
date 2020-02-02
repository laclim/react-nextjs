import { useState } from "react";
export const useForm = (value: any) => {
    const [state, setState] = useState(value);
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    return [state, handleChange, setState];
};
