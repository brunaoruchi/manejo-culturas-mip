import React from 'react'

import {
  Container,
  ContainerLeft,
  ContainerMiddle,
  ContainerRight,
} from './ItemList.styles'
import { Props } from './ItemList.types'
import Text from '../text/Text'
import RoundedButton from '../roundedButton/RoundedButton'

const ItemList: React.FC<Props> = ({ onPress, title, average, ...rest }) => {
  return (
    <Container {...rest}>
      <ContainerLeft>
        <Text size="medium" value={title} weight="bold" />
      </ContainerLeft>
      {!!average && (
        <ContainerMiddle>
          <Text size="medium" value="Média:" weight="bold" />
          <Text size="medium" value={average.toFixed(2)} weight="bold" />
        </ContainerMiddle>
      )}
      <ContainerRight>
        {!!average ? (
          <RoundedButton
            type="secondary"
            iconColor="#fff"
            icon="pencil"
            onPress={onPress}
          />
        ) : (
          <RoundedButton
            type="primary"
            iconColor="#000"
            icon="plus"
            onPress={onPress}
          />
        )}
      </ContainerRight>
    </Container>
  )
}

export default ItemList
