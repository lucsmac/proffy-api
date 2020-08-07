import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, AsyncStorage } from 'react-native'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'

const TeacherList = () => {
  const [teachers, setTeachers] = useState([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((favoritedTeacher: Teacher) => favoritedTeacher.id)

        setFavorites(favoritedTeachersIds)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  const handleToggleFiltersVisible = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  const handleFilterSumit = async () => {
    loadFavorites()

    const response = await api.get('classes', {
      params: { subject, week_day, time }
    })

    setIsFilterVisible(false)
    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={<BorderlessButton onPress={handleToggleFiltersVisible}><Feather name="filter" size={30} color="#FFF" /></BorderlessButton>}>
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>
                  Dia da semana
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>
                  Horário
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton onPress={handleFilterSumit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView style={styles.teacherList} contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16
      }}>
        {teachers.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />)}
      </ScrollView>
    </View>
  )
}

export default TeacherList
