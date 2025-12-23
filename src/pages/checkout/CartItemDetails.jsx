import axios from "axios";
import { formatMoney } from "../../utils/money";
import { Fragment } from "react";
export function CartItemDetails({ cartItem, loadCart }) {
  const deleteCart = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  return (
    <Fragment>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary">Update</span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCart}
          >
            Delete
          </span>
        </div>
      </div>
    </Fragment>
  );
}
