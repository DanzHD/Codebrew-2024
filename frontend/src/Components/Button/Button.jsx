import cx from "classnames";
import "./_button.scss";

const buttonTypes = {
    primary: "primary",
    secondary: "secondary"
}

export default function Button({
    children,
    onClick,
    disabled,
    className,
    id,
    small,
    fullWidth,
    dynamicWidth,
    submit,
    type = buttonTypes.primary,

}) {

    const computedClasses = cx(
        "button",
        `button--${type}`,
        {
            "button--small": small,
            "button--full-width": fullWidth,
            "button--dynamic-width": dynamicWidth,
        },
        className
    )

    return <button type={submit && "submit"} className={computedClasses} id={id} onClick={onClick} disabled={disabled}>{children}</button>
}