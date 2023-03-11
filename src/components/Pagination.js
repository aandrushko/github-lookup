import {useMemo} from "react";
import {loadRepositoriesWithParams} from "../features/ReposSlice";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

const PAGE_SIZE=10;

const PageControlButtton = styled.button`
  background-color: #fff;
  padding: 10px;
  min-width: 20px;
  border:none;
  cursor: pointer;
  border-bottom: ${props => props.disabled ? '1px solid green' : 'none'};
  &:hover {
    background-color: #ccc;
  }
`
const Pagination = ({seachValue}) => {
    const {currentPage, repositories, isLoadingRepositories, totalAmount} = useSelector((state) => state.repositories);
    const dispatch = useDispatch();
    const isTheLastPage = useMemo(() =>  Math.ceil(totalAmount/PAGE_SIZE) === currentPage, [currentPage, totalAmount]);
    const handlePageChange = (page) => {
        const params = {
            q:seachValue,
            per_page: PAGE_SIZE,
            page
        };
        dispatch(loadRepositoriesWithParams(params));
    };
    const renderPageButtons = () =>  {
        let pageArray = [];
        if (currentPage < 5){
            const maxLength = ((totalAmount / PAGE_SIZE) < PAGE_SIZE)? Math.ceil(totalAmount / PAGE_SIZE) : PAGE_SIZE;
            for (let i = 1; i <= maxLength; i++){
                pageArray.push(i);
            }
        } else {
            let maxPage = Math.ceil(totalAmount / PAGE_SIZE);
            for (let page = currentPage -4; page < currentPage + 6; page++){
                if(page <= maxPage){
                    pageArray.push(page)
                }
            }
        }
        return pageArray.map(pageNumber => (
            <PageControlButtton disabled={pageNumber === currentPage} onClick={()=> handlePageChange(pageNumber)}>{pageNumber}</PageControlButtton>
        ))
    };
    if (repositories.length === 0) return;
    return (
        <div>
            {currentPage > 1 &&  <PageControlButtton onClick={() => {handlePageChange(currentPage - 1 )}}>Previous page</PageControlButtton>}
            {renderPageButtons()}
            {!isTheLastPage &&  <PageControlButtton  onClick={() => {handlePageChange(currentPage + 1 )}}>Next Page</PageControlButtton> }
        </div>
    )
};

export default Pagination;