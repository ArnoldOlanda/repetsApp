import React, { useState } from 'react'
import { Button, ToastAndroid, Text } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

export const PaymentCheckout = ({ cardData, setCardData }) => {

  // const fetchPaymentIntentClientSecret = async () => {
  //   try {
  //     const response = await fetch(`http://192.168.1.34:8000/api/payment-intent`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         amount: 300_00,
  //         currency: 'usd',
  //       }),
  //     });
  //     const { clientSecret } = await response.json();

  //     return clientSecret;

  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  const handlePayPress = async () => {
    if (!cardData.complete) {
      ToastAndroid.show('Revisa los datos ingresados', ToastAndroid.LONG);
      return;
    }

    // Fetch the intent client secret from the backend.
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          email: 'olanda188@gmail.com'
        }
      },
    });


    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      ToastAndroid.show('Pago realizado con exito', ToastAndroid.LONG);
    }
  };

  return (
    <>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 60,
          marginVertical: 10,
        }}
        onCardChange={(cardDetails) => {
          setCardData(cardDetails);
        }}
      />
      <Text style={{ fontSize: 12 }} >*Solo Visa disponible por el momento</Text>
    </>
  )
}