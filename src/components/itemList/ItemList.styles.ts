import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  border-width: 1px;
  border-color: #ffc042;
  border-radius: 8px;

  background-color: #fff;

  padding: 16px 8px;
`

export const ContainerLeft = styled.View`
  flex: 3;
`

export const ContainerMiddle = styled.View`
  flex: 1;
  align-items: center;
`

export const ContainerRight = styled.View`
  flex: 1;
  align-items: flex-end;
`
