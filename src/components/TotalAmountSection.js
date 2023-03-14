import {useSelector} from "react-redux";
import NoResultsFound from "./NoResultsFound";
const TotalAmountSection = ({searchValue = ''}) => {
    const { totalAmount, errorMessage} = useSelector(
        (state) => state.repositories);
    if (errorMessage.length > 0) {
         return <p style={{color: "red"}}>{errorMessage}</p>
    }
    if(searchValue.length === 0){
        return <p>Please type search value</p>
    }
    if(totalAmount.length === 0) {
        return  <NoResultsFound searchValue={searchValue} />
    }
    return (
         <p> {totalAmount} {totalAmount > 1? 'repos' : 'repo' } found </p>
    )
}
export default TotalAmountSection;