import styled from "styled-components";
import StartIcon from '../assets/star.png'
import PersonIcon from '../assets/person.png'


const CardWrapper = styled.div`
    width: 100%;
    padding: 40px;
    display: flex;
    box-sizing: border-box;
    background-color: #FFF;
    margin: 36px 0px;
    border-radius: 20px;
      -webkit-box-shadow: -2px 1px 57px -18px rgba(204,204,204,1);
      -moz-box-shadow: -2px 1px 57px -18px rgba(204,204,204,1);
      box-shadow: -2px 1px 57px -18px rgba(204,204,204,1);
`
const RepoLogo = styled.img`
    width: 100%;
    height: auto;
`;
const MainDataColumn = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
`;
const DataParagraph= styled.div`
    padding:2px;
    margin:2px
`;
const StatsColumn = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 30px 181px;
  gap: 5px;
  align-self: flex-end;
  margin-left: auto;
  align-items: center;
  font-size: 16px;
  text-align: left;
`;
const StatIcon = styled.img`
    height: 24px;
`;

const RepoCard = ({repoData}) => {
    const {owner, stargazers_count, watchers_count, language, description, full_name} = repoData;

    return(
        <CardWrapper>
            <div style={{height: '150px', maxWidth: '140px'}}>
                <RepoLogo src={owner.avatar_url} alt=""/>
            </div>
            <MainDataColumn>
                <DataParagraph><b>{full_name}</b></DataParagraph>
                <DataParagraph>Author: {owner.login}</DataParagraph>
                <DataParagraph>Language: {language}</DataParagraph>
                <DataParagraph>Description: <br/> {description}</DataParagraph>
            </MainDataColumn>
            <StatsColumn>
                    <StatIcon src={StartIcon}/> <DataParagraph>{stargazers_count} <span style={{color: '#ccc'}}>stars</span></DataParagraph>
                    <StatIcon src={PersonIcon}/> <DataParagraph>{watchers_count} watchers</DataParagraph>
            </StatsColumn>
        </CardWrapper>
    )
}
export default RepoCard;