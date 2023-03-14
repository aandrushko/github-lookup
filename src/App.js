import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "./helpters/useDebounce";
import { reset, loadRepositoriesWithParams } from "./features/ReposSlice";
import RepoCard from "./components/RepoCard";
import NoResultsFound from "./components/NoResultsFound";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

const PAGE_SIZE = 10;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
`;

function App() {
  const { repositories, isLoadingRepositories, totalAmount } = useSelector(
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
        })
      );
    } else {
      dispatch(reset());
    }
  }, [debouncedSearchValue, dispatch]);
  return (
    <div className="App'" style={{ backgroundColor: "rgb(254,254,254)" }}>
      <MainContainer>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        {isLoadingRepositories ? (
          <p>
            <i> Loading...</i>
          </p>
        ) : totalAmount > 0 && debouncedSearchValue.length ? (
          <p>Total amount - {totalAmount} </p>
        ) : (
          <NoResultsFound searchValue={debouncedSearchValue} />
        )}
        <Pagination seachValue={debouncedSearchValue} />
        {repositories.length > 0 &&
          repositories.map((repo) => <RepoCard repoData={repo} />)}
        <Pagination seachValue={debouncedSearchValue} />
      </MainContainer>
    </div>
  );
}
export default App;
