import styled from 'styled-components/native'

export const Container = styled.View``

export const Buttons = styled.View`
  flex: 1;
  flex-direction: row;
`

export const ButtonStyled = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #3C8DBC;
  background-color: ${({ active }) => (active ? '#3C8DBC' : 'transparent')};
`
