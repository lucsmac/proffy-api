import React from 'react'
import { View, Image, Text } from 'react-native'

import styles from './styles'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import { RectButton } from 'react-native-gesture-handler'

const TeacherItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://avatars0.githubusercontent.com/u/55163413?s=460&u=4efcc2eba0c8f0ae229b2ea9c0ace6d18cb0a55f&v=4' }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Lucas Macedo</Text>
          <Text style={styles.subject}>Engenharia de software</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Me chamo Lucas (🇧🇷) e sou desenvolvedor web front-end. Criar soluções (lindíssimas) através da engenharia sempre fez meus olhos brilharem 😍, isso contribuiu para que eu me especializasse em áreas como programação 😵 e UI/UX 😱
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue} >R$ 20,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.favorited]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem
