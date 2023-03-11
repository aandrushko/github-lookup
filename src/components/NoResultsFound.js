const NoResultsFound = ({searchValue}) => {
    if (searchValue.replace(" ","").length === 0) return null;
    return (
        <p>No matches for this request:   <i>{searchValue}</i></p>
    )
}
export default NoResultsFound;