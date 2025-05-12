* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: "Poppins", sans-serif;
    background: linear-gradient(135deg, #fdf6e3, #fae3d9);
    color: #333;
    line-height: 1.6;
    padding: 10px;
  }
  .section-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .centered {
    text-align: center;
    margin-top: 10px;
  }
  
  .item img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  header,
  footer {
    background-color: #483129;
    color: white;
    text-align: center;
    padding: 20px;
    border-radius: 12px;
  }
  
  header h1 {
    font-size: 2.5rem;
  }
  
  .hero {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(to right, #fceabb, #f8b500);
    color: #3e2723;
    border-radius: 16px;
    margin: 20px 0;
  }
  
  .menu-section,
  .cart-section,
  .checkout-section {
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .menu-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
  }
  
  .item {
    background: #fffdfa;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .item img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .item h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  
  .item p {
    margin-bottom: 10px;
    font-weight: bold;
    color: #5d4037;
  }
  
  .item input {
    width: 60px;
    padding: 6px;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #8d6e63;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #6d4c41;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  .cart-items {
    margin: 16px 0;
    min-height: 30px;
    text-align: center;
  }
  
  .cart-items li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  /* Check out */
  
  .checkout-section {
    display: none;
    text-align: center;
    padding: 10px;
  }
  .checkout-section h2 p {
    text-align: center;
    padding: 10px;
    margin: 10px;
  }
  .checkout-section p {
    font-size: 14px;
  }
  .checkout-section button {
    margin: 16px;
    padding: 10px;
  }
  .checkout-section ul {
    list-style-type: none;
    padding: 0;
    margin: 10px 0;
  }
  
  .checkout-section li {
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .checkout-section p {
    font-size: 16px;
    margin-top: 10px;
  }
  
  /* Remove Button */
  
  .remove-btn {
    background-color: #e74b4b;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .remove-btn:hover {
    background-color: #d37c46;
  }
  
  /* Cart Item */
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d1c4b3;
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 8px;
    background-color: #faf0e6;
    gap: 10px;
    transition: background-color 0.3s ease;
  }
  
  .cart-item.added {
    animation: flash 0.5s ease-out;
  }
  
  @keyframes flash {
    0% {
      background-color: #f9c5b5;
    }
    100% {
      background-color: #faf0e6;
    }
  }
  
  .cart-item:hover {
    background-color: #f1e4d1; /* Light highlight color */
  }
  
  .cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    border-top: 2px solid #d1c4b3;
    padding-top: 10px;
    margin-top: 10px;
    transition: all 0.3s ease;
  }
  .item-info {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .item-info .price {
    min-width: 60px;
    text-align: right;
    font-weight: 600;
  }
  
  /* Total price */
  
  .cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    border-top: 2px solid #d1c4b3;
    padding-top: 10px;
    margin-top: 10px;
  }
  
  .total-price {
    min-width: 80px;
    text-align: right;
    font-size: 20px;
    color: #7a4f35; /* Coffee brown */
  }
  .confirmation-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .confirmation-header .checkmark {
    font-size: 40px;
    color: #4CAF50;
    margin-bottom: 10px;
  }
  
  .confirmation-header h2 {
    margin: 0;
    font-size: 22px;
    color: #333;
  }
  
  .confirmation-header p {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
  
 /* Order Confirmation Styles */

  #checkout-section {
    background-color: #fdfdfd;
    padding: 20px;
    border-radius: 12px;
    max-width: 500px;
    margin: 20px auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', sans-serif;
  }
  
  #order-summary {
    margin-bottom: 20px;
  }
  
  #order-summary p {
    margin: 6px 0;
    font-size: 14px;
  }
  
  #order-summary ul {
    list-style: none;
    padding: 0;
    margin: 12px 0;
  }
  
  #order-summary li {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px dashed #ccc;
    font-size: 14px;
  }
  
  #order-summary li:last-child {
    border-bottom: none;
  }
  
  #order-summary strong {
    font-weight: bold;
  }
  
  .cart-total-confirm {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-weight: bold;
    font-size: 16px;
  }
  
  #qrcode {
    text-align: center;
    margin-top: 20px;
  }
  
  #qrcode canvas {
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 8px;
  }
  
  #cart {
    margin-bottom: 20px;
  }
  #cart table {
    width: 100%;
    border-collapse: collapse;
  }
  #cart th, #cart td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  #cart th {
    background-color: #f2f2f2;
  }
  #confirm-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #458500;
    color: white;
    border: none;
    cursor: pointer;
  }
  #confirm-button:hover {
    background-color: #356400;
  }
  
  @media (max-width: 768px) {
    .hero h2 {
      font-size: 1.5rem;
    }
    .item {
      padding: 16px;
    }
    button {
      padding: 8px 16px;
    }
  }
  
  @media (max-width: 480px) {
    header h1 {
      font-size: 1.5rem;
    }
    .hero {
      padding: 40px 10px;
    }
    .item input {
      width: 50px;
    }
  }
