export default function OrderConfirmation({ params }) {
    const { orderId } = params;
  
    return (
      <div>
        <h1>Order Confirmed 🎉</h1>
        <p>Your order ID is: {orderId}</p>
      </div>
    );
  }
  