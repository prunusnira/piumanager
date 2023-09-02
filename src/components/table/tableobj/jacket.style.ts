import styled from "styled-components";

export const JacketDiv = styled.div`
  position: relative;
`;

export const StepType = styled.img`
  width: 20%;
  top: 0;
  left: 0;
  position: absolute;
`;

export const Version = styled.img`
  width: 40%;
  right: 0;
  bottom: 0;
  position: absolute;
`;

export const New = styled.img`
  width: 50%;
  left: 0;
  bottom: 0;
  position: absolute;
`;

export const Rank = styled.img<{ display: boolean }>`
  width: 50%;
  position: absolute;
  right: 0;
  top: 0;
`;

export const BreakOff = styled.img`
  width: 50%;
  position: absolute;
  right: 0;
  top: 25%;
`;

export const Removed = styled.img`
  width: 50%;
  left: 0;
  bottom: 0;
  position: absolute;
`;

export const JacketImg = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
`;
