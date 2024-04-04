import "./_text.scss"
import cx from "classnames";

export default function Text({
    heading,
    subheading,
    children,
    bold,
    className,
    centered,
    small,
    ellipsis,
    onClick,
    large,
    italicize,
    color
}) {

    const textStyles = {
        textAlign: centered ? "center": "start",
        textOverflow: ellipsis ? "ellipsis" : "none"
    }

    const computedClassNames = cx(
        "text",
            `text--${color}`,
        {
            "text--bold": bold,
            "text--small": small,
            "text--large": large,
            "text--italicize": italicize
        },
        className
    );

    if (heading) {
        return <h1 style={textStyles} onClick={onClick} className={computedClassNames}>{children}</h1>
    }

    if (subheading) {
        return <h2 style={textStyles} onClick={onClick} className={computedClassNames}>{children}</h2>
    }

    return <p style={textStyles} onClick={onClick} className={computedClassNames}>{children}</p>



}