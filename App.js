// import 'react-native-gesture-handler';
import Main from "./Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";


const stripeKey =
  "pk_test_51OyxJ32LKBKaPHzvYSwVDnVrfoB5MmhIhPzm7RrKnyEwQFjd7C3fJa6MR4UF3eCtfleKLiEMzw4zOuab9SLvmLLZ00I4y76pnb";

export default function App() {
  return (
    <StripeProvider
      threeDSecureParams={{
        backgroundColor: "#fff",
        timeout: 5,
      }}
      merchantIdentifier="6-pack-ecom.com"
      publishableKey={stripeKey}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}