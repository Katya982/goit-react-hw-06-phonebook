import styled from 'styled-components';

export const Label = styled.label`
    margin-right: 20px;
   
`;

export const Input = styled.input`
    margin-left: 10px;
`;

export const Button = styled.button`
  cursor: pointer;
  border: solid 1px transparent;
  border-radius: 4px;
  padding: 3px 30px;
  color: #ffffff;
  background-color: #9555af;
  margin-right: 20px;

  &:active {
  transform: translateY(1px);
  filter: saturate(150%);
}

&:hover,
&:focus {
  color: #9555af;
  border-color: currentColor;
  background-color: white;
}

    &:last-child {
    margin-bottom: 0;
    }
`;