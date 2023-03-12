import React from 'react'
import { Body, Container, DateContaienr, Header } from './Card.styles'
import Button from '../button/Button'
import Text from '../text/Text'
import Icon from '../icon/Icon'
import { Props } from './Card.types'
import RoundedButton from '../roundedButton/RoundedButton'

const Card: React.FC<Props> = ({
  title,
  date,
  onPress,
  titleButton,
  buttonType,
  leftIconOnPress,
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Header>
        {!!title && (
          <Text
            size="large"
            value={title}
            weight="bold"
            style={{ color: '#fff' }}
          />
        )}

        {!!date && (
          <DateContaienr>
            <>
              <Icon
                color="#fff"
                name="calendar"
                size="medium"
                style={{ marginRight: 16 }}
              />
              <Text
                size="small"
                value={date}
                weight="bold"
                style={{ color: '#fff' }}
              />
            </>
          </DateContaienr>
        )}

        {!!leftIconOnPress ? (
          <RoundedButton
            iconColor="white"
            type="secondary"
            icon="pencil"
            onPress={leftIconOnPress}
          />
        ) : null}
      </Header>

      <Body>
        {children}
        {!!titleButton && (
          <Button
            style={{ marginTop: 8 }}
            title={titleButton}
            type={buttonType}
            onPress={onPress}
          />
        )}
      </Body>
    </Container>
  )
}

export default Card
