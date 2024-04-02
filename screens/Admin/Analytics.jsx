import { View, Text, ScrollView, Dimensions,StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Layout/Loader";
import OrderStatusPieChart from "../../components/Admin/PieChart";
import OrderSumByMonthLineChart from "../../components/Admin/LineChart";
import { useMessageAndErrorOther, useChartData } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const Analytics = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [date, setDate] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    const formattedDate = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString();

    const { chartData, chartData2, /* chartData3, */ loading, error } = useChartData(
        dispatch,
        isFocused
    );

    const processAnalyticsLoading = useMessageAndErrorOther(
        navigation,
        "profile",
    );

    const styles = StyleSheet.create({
        container: {
          backgroundColor: colors.color3,
          borderRadius: 20,
          alignItems: "center",
          marginBottom: 10,
        },
      });

    return (
        <View
            style={{
                ...defaultStyle,
                backgroundColor: colors.color5,
            }}
        >
            <Header back={true} />

            {/* Heading */}
            <View style={{ marginBottom: 20, paddingTop: 70 }}>
                <Text style={formHeading}>Analytics</Text>
            </View>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                    <Text>Current Date: {formattedDate}</Text>
                    <Text>Current Time: {formattedTime}</Text>
                    </View>

                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>ORDER STATUS</Text>
                            <View
                               style={styles.container}
                            >
                                <OrderStatusPieChart
                                    loading={processAnalyticsLoading}
                                    data={chartData}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Customer Sales</Text>
                            <View
                                style={{
                                    backgroundColor: colors.color3,
                                    borderRadius: 20,
                                    alignItems: "center",
                                    marginBottom: 10,
                                    
                                }}
                            >
                                <OrderSumByMonthLineChart
                                    loading={processAnalyticsLoading}
                                    data={chartData2}
                                    
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Monthly Sales</Text>
                            <View
                                style={{
                                    backgroundColor: colors.color3,
                                    borderRadius: 20,
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                            >

                               {/*  <MonthlySalesChart
                                    inStock={inStock}
                                    outOfStock={outOfStock}
                                    loading={processAnalyticsLoading}
                                    data={chartData3}
                                /> */}
                            </View>
                        </View>

                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default Analytics;