import Text from "../../Components/Text/Text.jsx";
import "./_loading.scss"
import {GridLoader} from "react-spinners";

export default function Loading({
    description
}) {

    return (
        <div className="load">
            <GridLoader></GridLoader>
            <Text>{description}</Text>
        </div> )
}