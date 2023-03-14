import styled from "styled-components";

const SearchInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  font-size: 16px;
  -webkit-box-shadow: -2px 1px 57px -18px rgba(204,204,204,1);
  -moz-box-shadow: -2px 1px 57px -18px rgba(204,204,204,1);
  box-shadow: -2px 1px 57px -18px rgba(204,204,204,1);
  border:none;
  box-sizing: border-box;
`
const SearchBar = ({searchValue, setSearchValue}) => {
    return (
        <SearchInput
            type="text"
            onChange={(event) => setSearchValue(event.target.value)}
            value={searchValue}
            placeholder="Search"
        />
    )
}
export default SearchBar;