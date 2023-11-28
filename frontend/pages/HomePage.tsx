import { View, Text, Dimensions } from 'react-native';
import { Button } from '@rneui/base';
import SearchMeal from '../components/SearchMeal';
import DisplayMeal from '../components/DisplayMeal';
import { ProgressChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

const HomePage = ({ navigation }: { navigation: any }) => {
    const data = {
        labels: ['Calories', 'Protein', 'Fat', 'Carbohydrates'], // optional
        data: [0.4, 0.6, 0.8, 0.1]
      };

      const chartConfig = {
        backgroundColor: "#000000",
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        useShadowColorFromDataset: false, // optional
      };

      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{fontSize: 32, fontWeight: 'bold', marginVertical: 20, marginLeft: 20 }}>Welcome!</Text>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ 
                borderRadius: 55,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#000',
                width: height > width ? width: 0.5 * width,
                height: height > width ? 0.35 * height: 0.3 * height
            }}>
              <ProgressChart
                data={data}
                width={height > width ? width: 0.5 * width}
                height={height > width ? 0.35 * height: 0.3 * height}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={true}
              />
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Search meals"
                onPress={() => navigation.navigate('Search')}
            />
          </View>
        </View>
    );
}

export default HomePage;