import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/userActions";
import { server } from "../redux/store";
// import { getAdminProducts } from "../redux/actions/productActions";
// import { fetchChart1Data, fetchChart2Data, fetchChart3Data } from "../redux/actions/otherActions";

export const useMessageAndErrorUser = (
    navigation,
    dispatch,
    navigateTo = "login"
) => {
    const { loading, message, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            navigation.reset({
                index: 0,
                routes: [{ name: navigateTo }],
            });
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });
            dispatch(loadUser());
        }
    }, [error, message, dispatch]);

    return loading;
};

export const useMessageAndErrorOther = (
    dispatch,
    navigation,
    navigateTo,
    func
) => {
    const { loading, message, error } = useSelector((state) => state.other);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });

            navigateTo && navigation.navigate(navigateTo);

            func && dispatch(func());
        }
    }, [error, message, dispatch, navigateTo, func]);

    return loading;
};

export const useMessageAndErrorOrder = (
    dispatch,
    navigation,
    navigateTo,
    func
) => {
    const { loading, message, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            Toast.show({
                type: "error",
                text1: error,
            });
            dispatch({
                type: "clearError",
            });
        }

        if (message) {
            Toast.show({
                type: "success",
                text1: message,
            });
            dispatch({
                type: "clearMessage",
            });

            navigateTo && navigation.navigate(navigateTo);

            func && dispatch(func());
        }
    }, [error, message, dispatch, navigateTo, func]);

    return loading;
};

export const useSetCategories = (setCategories, isFocused) => {
    useEffect(() => {
        axios
            .get(`${server}/category/all`)
            .then((res) => {
                console.log(res)
                setCategories(res.data.categories);
            })
            .catch((e) => {
                console.log(e.message)
                Toast.show({
                    type: "error",
                    text1: e.message,
                });
            });
    }, [isFocused]);
};

export const useGetOrders = (isFocused, isAdmin = false) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${server}/order/${isAdmin ? "admin" : "my"}`)
            .then((res) => {
                setOrders(res.data.orders);
                setLoading(false);
            })
            .catch((e) => {
                Toast.show({
                    type: "error",
                    text1: e.response.data.message,
                });
                setLoading(false);
            });
    }, [isFocused]);

    return {
        loading,
        orders,
    };
};

// export const useAdminProducts = (dispatch, isFocused) => {
//     const { products, inStock, outOfStock, error, loading } = useSelector(
//         (state) => state.product
//     );

//     useEffect(() => {
//         if (error) {
//             Toast.show({
//                 type: "error",
//                 text1: error,
//             });
//             dispatch({
//                 type: "clearError",
//             });
//         }

//         dispatch(getAdminProducts());
//     }, [dispatch, isFocused, error]);

//     return {
//         products,
//         inStock,
//         outOfStock,
//         loading,
//     };
// };

// export const useChartData = (isFocused) => {
//     const dispatch = useDispatch();
//     const { chartData, chartData2, chartData3, error, loading } = useSelector((state) => state.other);

//     useEffect(() => {
//         if (error) {
//             Toast.show({
//                 type: "error",
//                 text1: error,
//             });
//             dispatch({
//                 type: "clearError",
//             });
//         }

//         if (isFocused) {
//             dispatch(fetchChart1Data());
//             dispatch(fetchChart2Data());
//             dispatch(fetchChart3Data());
//         }
//     }, [dispatch, isFocused, error]);

//     return {
//         chartData,
//         chartData2,
//         chartData3,
//         loading,
//     };
// };