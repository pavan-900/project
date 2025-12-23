import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router";
import { Header } from "../components/Header";
import "./TrackingPage.css";
import { useEffect, useState } from "react";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fectchOrder = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };
    fectchOrder();
  }, [orderId]);

  if (!order) {
    return null;
  }
  const product = order.products.find((p) => {
    return p.product.id === productId;
  });
  const totalDeliveryTimeMs =
    product.estimatedDeliveryTimeMs - order.orderTimeMs;
  // const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  const timePassedMs = totalDeliveryTimeMs * 90;
  console.log(timePassedMs);
  console.log(totalDeliveryTimeMs);
  let deliveryProgress = (timePassedMs / totalDeliveryTimeMs) * 0.3;
  console.log(deliveryProgress);
  if (deliveryProgress > 100) {
    deliveryProgress = 100;
  }
  const status =
    deliveryProgress < 33
      ? "preparing"
      : deliveryProgress < 100
      ? "shipped"
      : "delivered";
  const isPreparing = status === "preparing";
  const isShipped = status === "shipped";
  const isDelivered = status === "delivered";
  console.log(status);
  return (
    <>
      <title>Tracking</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/icons/tracking-favicon.png"
      />
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {new Date(product.estimatedDeliveryTimeMs).toDateString()}
          </div>

          <div className="product-info">{product.product.name}</div>

          <div className="product-info">{product.quantity}</div>

          <img className="product-image" src={product.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"} `}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
