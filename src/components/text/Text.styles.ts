import styled from 'styled-components/native'

type Props = {
    size: 'small' | 'medium' | 'large';
    weight: 'thin' | 'medium' | 'bold';
}

const sizes = {
    small: 16,
    medium: 18,
    large: 20,
}

const fonts = {
    thin: 'Inter_100Thin',
    medium: 'Inter_500Medium',
    bold: 'Inter_700Bold',
}

export const TextStyled = styled.Text<Props>`
    font-family: ${({ weight }) => fonts[weight]}
    font-size: ${({ size }) => sizes[size]}px;
`
