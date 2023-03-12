import styled from 'styled-components/native'

export type Props = {
  type: 'primary' | 'secondary' | 'third' | 'fourth'
  disabled?: boolean
  size: 'large' | 'xlarge'
}

const colors = {
  primary: 'transparent',
  secondary: '#FFC042',
  third: '#00DA6D',
  fourth: '#B50505',
}

export const ButtonStyled = styled.TouchableOpacity<Props>`
  align-items: center;
  justify-content: center;

  background-color: ${({ type }) => colors[type]};
  border-radius: 9999px;
  width:  ${({ size }) => size === 'large' ? 32 : 48}px;
  height: ${({ size }) => size === 'large' ? 32 : 48}px;
`
