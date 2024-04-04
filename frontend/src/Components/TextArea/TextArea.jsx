import cx from "classnames";
import "./_textArea.scss"
export default function TextArea({
    name,
    fullWidth
}) {
    const computedClassnames = cx(
        "text-area",
        {
            "text-area--fullWidth": fullWidth
        }
    )

    return <textarea name={name} className={computedClassnames}></textarea>
}