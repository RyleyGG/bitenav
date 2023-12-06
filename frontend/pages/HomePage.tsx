import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import SearchMeal from '../components/SearchMeal';
import DisplayMeal from '../components/DisplayMeal';
import { ProgressChart } from 'react-native-chart-kit';
import { hexToRgba } from "../services/GeneralUtilityService";

const { width, height } = Dimensions.get('window');

const HomePage = ({ navigation }: { navigation: any }) => {
    const data = {
        labels: ['Calories', 'Protein', 'Fat', 'Carbohydrates'],
        colors: ['#ff6961', '#aec6cf', '#77dd77', '#cda4de'],
        data: [0.4, 0.6, 0.8, 0.1]
      };

      const chartConfig = {
        backgroundColor: "#f2f2f2",
        backgroundGradientFrom: "#f2f2f2",
        backgroundGradientTo: "#f2f2f2",
        color: (opacity = 1, index = 0) => hexToRgba(data.colors[index], opacity),
        labelColor: (opacity = 1, index = 0) => data.colors[index],
        useShadowColorFromDataset: false,
      };


      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginVertical: 20, marginLeft: 20 }}>Welcome!</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ 
              borderRadius: 55,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#f2f2f2',
              backgroundColor: '#f2f2f2',
              width: height > width ? width : 0.8 * width,
              height: 0.3 * height,
              flex: 1,
              flexDirection: 'row'
            }}>
              <ProgressChart
                data={ data }
                width={height > width ? width * 0.5 : 0.8 * width}
                height={0.3 * height}
                strokeWidth={12}
                radius={24}
                chartConfig={ chartConfig }
                hideLegend={true}
              />
              <View style={{ marginLeft: 20, marginTop: 50 }}>
                {data.data.map((item, index) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }} key={index}>
                    <View style={{ width: 10, height: 10, backgroundColor: data.colors[index], marginRight: 5 }} />
                    <Text style={{ color: 'black' }}>{`${data.labels[index]}: ${item * 100}%`}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              title="Search Meals"
              onPress={() => navigation.navigate('Search')}
            />
            <Button
              title="Custom Meals"
              onPress={() => navigation.navigate('CustomMeals')}
            />
          </View>
        </View>

    );
}

export default HomePage;

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'rgb(179, 229, 255)',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  
    flex: 1,
    padding: 50,
    borderColor: "black",
    borderRadius: 2,
  }, 
  buttons: {
      flex:1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 1,
      fontSize: 15,
      marginTop: 5,
      marginBottom: 5,
      gap: 5
  },
  Separator: {
    height: 2,
    backgroundColor: "black"
  }
});