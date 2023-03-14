import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useDebounce, { PAGE_SIZE } from "./helpters/useDebounce";
import { reset, loadRepositoriesWithParams } from "./features/ReposSlice";
import RepoCard from "./components/RepoCard";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import TotalAmountSection from "./components/TotalAmountSection";

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
`;
const LoadingOverlay = styled.div`
  position: fixed;
  height: 100vh;
  text-align: center;
  background-color: rgb(254,254,254, 0.5);
  width: 100vw;
  font-size: 30px;
  pointer-events: none;
`

function App() {
  const { repositories, isLoadingRepositories } = useSelector(
    (state) => state.repositories
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("react");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue.length > 0) {
      dispatch(
        loadRepositoriesWithParams({
          q: debouncedSearchValue,
          per_page: PAGE_SIZE,
          page: 1,
          searchChanged: true,
        })
      );
    } else {
      dispatch(reset());
    }
  }, [debouncedSearchValue, dispatch]);
  return (
    <div className="App'" style={{ backgroundColor: "rgb(254,254,254)" }}>
        {isLoadingRepositories && <LoadingOverlay> <p><i> Loading...</i></p></LoadingOverlay>}
      <MainContainer>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

        <TotalAmountSection searchValue={searchValue}/>
        <Pagination seachValue={debouncedSearchValue} />
        {repositories.length > 0 &&
          repositories.map((repo) => <RepoCard repoData={repo} />)}
        <Pagination seachValue={debouncedSearchValue} />
      </MainContainer>
    </div>
  );
}
export default App;
