import { View, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
/* import { colors } from "../styles/styles"; */

const colors = {
    color1: '#FFFF00', // yellow
    color2: '#FFA500', // orange
  };

const screenWidth = Dimensions.get("screen").width - 20 - 75;

export default OrderStatusPieChart = ({ data }) => {
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        setChartData(data);
    }, [data]);

    return (
        <View>
            <PieChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: colors.color1,
                    backgroundGradientTo: colors.color2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
    );
}