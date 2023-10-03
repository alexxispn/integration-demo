interface IProps {
    onClick: () => void;
    text: string;
    disabled?: boolean;
}


export const Button = ({onClick, text, disabled = false}: IProps) =>  {

    return (
        <button onClick={onClick}
                disabled={disabled}
        >{text}</ button>
    );
}
