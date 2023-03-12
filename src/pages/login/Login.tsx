import React, { useState } from 'react'

import Logo from '../../../assets/logo.png'

import { Container } from './Login.styles'
import { Image, View } from 'react-native'
import Text from '../../components/text/Text'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useAuth } from '../../hooks/Auth'

const Login: React.FC = () => {
  const { signIn } = useAuth()

  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={Logo}
          style={{ width: 375, height: 196, marginTop: 64 }}
          resizeMode="contain"
        />

        <Text
          size="large"
          value="Faça seu login"
          weight="bold"
          style={{ color: '#003b73', marginVertical: 32 }}
        />
        <Input
          type="email"
          placeholder="E-mail"
          viewStyle={{ marginBottom: 32 }}
          onChangeText={setEmail}
        />
        <Input
          type="password"
          placeholder="Senha"
          showValue={showPass}
          onChangeText={setPassword}
          onPressRightIcon={() => {
            setShowPass(old => !old)
          }}
        />
      </View>
      <Button
        title="Entrar"
        type="primary"
        onPress={() =>
          signIn({
            email,
            password,
          })
        }
      />
    </Container>
  )
}

export default Login
