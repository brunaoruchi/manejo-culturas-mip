import styled, { css } from 'styled-components/native'

type Props = {
  type: 'default' | 'search' | 'email' | 'password'
}

export const Container = styled.View<Props>`
  background-color: #fff;

  flex-direction: row;
  align-items: center;

  padding: 8px;
  border-radius: 4px;

  ${({ type }) => {
    if (type === 'default' || type === 'search') {
      return css`
        border-color: #000;
        border-width: 1px;ß
      `
    }
  }}
`

export const InputStyled = styled.TextInput`
  flex: 1;
  font-family: Inter_500Medium;
  font-size: 18px;
`
