import styled from "styled-components";
import {TitleBlack} from "../../../styled/common.color";

export const ScoreTableWrapper = styled.section<{ display: boolean }>`
  display: ${(props) => (props.display ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 1280px;
`;

export const ScoreTableTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${TitleBlack};
  padding: 10px;
  width: 100%;
`;

export const ScoreTableTitleMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ScoreTableProfile = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${TitleBlack};
  padding: 10px;
  width: 100%;
`;

export const ScoreTableLv = styled.div`
  display: flex;
  background-color: ${TitleBlack};
  padding: 10px;
  width: 100%;
`;

export const ScoreTableUserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const ScoreTableClearCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  padding: 10px;
`;

export const UserInfoDivide = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 80%;
`;

export const DataWrapper = styled.div<{ bgColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  width: 100%;
`;

export const DataTitle = styled.div`
  color: ${TitleBlack};
  font-size: 20px;
  padding: 20px;
`;

export const DataInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;
