import styled, { css } from 'styled-components/native'

export type Props = {
  type: 'primary' | 'secondary' | 'third' | 'fourth' | 'fifth'
  disabled?: boolean
}

const colors = {
  primary: '#3C8DBC',
  secondary: '#FFC042',
  third: '#00DA6D',
  fourth: 'transparent',
  fifth: '#D14A61',
}

export const ButtonStyled = styled.TouchableOpacity<Props>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ type }) => colors[type]};
  padding: 12px 16px;
  border-radius: 8px;

  ${({ disabled }) => {
    if (disabled)
      return css`
        background-color: #9f9faf;
      `
  }}

  ${({ type }) => {
    if (type === 'fourth') {
      return css`
        border-width: 1px;
        border-color: #000;
      `
    }
  }}
`
