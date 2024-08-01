import { useEffect, useState } from "react";

interface InputType {
    plan: "FREE" | "PREMIUM" | "BUSINESS";
    field: any;
    errors?: { type: string; success: boolean; message: string }[];
    value?: string;
    onChange?: (value: string) => void;
}
export default function Input({ plan, field, errors, value, onChange }: InputType) {
    const [text, setText] = useState<string>(value || "");
    useEffect(() => {
        if (onChange) {
            onChange(text);
        }
    }, [text, onChange]);
    useEffect(() => {
        if (value) {
            setText(value);
        }
    }, [value]);
    function check(): boolean {
        if (field[plan]) {
            return false;
        } else {
            return true;
        }
    }
    return (
        <>
            <label>
                <span className={field?.options?.icon || field?.options?.title ? "mb-1 px-2" : ""}>
                    {field?.options?.icon && <i className={`bi bi-${field.options.icon} mr-1.5`}></i>}
                    {field?.options?.title && <span>{field.options.title}{check() ? ` (Upgrade)` : ""}</span>}
                </span>
                <input
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    max={field?.options?.max || 250}
                    maxLength={field?.options?.max || 250}
                    className={`inp-text`}
                    pattern={field?.options?.pattern}
                    type={field?.options?.type}
                    name={field?.options?.name}
                    placeholder={field?.options?.placeholder}
                    disabled={field?.options?.disabled || check() ? true : false}
                    required={field?.options?.required}
                />
                {errors?.map((error, index) => { return error.type === field?.options?.name ? error.success ? <p className="mt-0.5 text-green-800 font-bold">{error.message}</p> : <p key={index} className="mt-0.5 text-red-800 font-bold" >{error.message}</p> : "" })}
            </label>
        </>
    );
}