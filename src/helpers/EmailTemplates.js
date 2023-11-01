export const orderPlacedTemplate = ({ orderId, paymentId, products, address }) => {
  const productRows = products.map((product) => `
        <tr>
            <td>
                <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <img src="${product.image}" alt="${product.title}" style="max-width: 100px; margin: 0 auto 10px;">
                    <h4 style="font-size: 18px; margin: 0;">${product.title}</h4>
                </div>
            </td>
            <td>₹${product.price}</td>
            <td>${product.quantity}</td>
        </tr>
    `).join('');

  return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                }
                .email-container {
                    max-width: 100%; /* Make it responsive */
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #ccc;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007BFF;
                    color: #fff;
                    text-align: center;
                    padding: 20px;
                    border-radius: 5px 5px 0 0;
                }
                .header h1 {
                    font-size: 24px;
                }
                .order-details {
                    margin: 20px 0;
                }
                .order-details p {
                    margin: 10px 0;
                    font-size: 16px; /* Improved font size */
                }
                .product {
                    background-color: #f9f9f9; /* Change product background color */
                    border: 1px solid #ccc;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .product img {
                    max-width: 100px;
                }
                .address {
                    background-color: #f9f9f9; /* Change address background color */
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 5px;
                }
                .additional-info {
                    background-color: #f9f9f9; /* Change additional info background color */
                    border: 1px solid #ccc;
                    padding: 20px;
                    margin-top: 20px;
                    border-radius: 0 0 5px 5px;
                }
                .additional-info p {
                    margin: 10px 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ccc;
                    padding: 10px;
                    text-align: left;
                }

                @media screen and (max-width: 600px) {
                    .product td {
                        display: block;
                        text-align: center;
                    }
                    .product img {
                        margin: 0 auto 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Order Confirmation</h1>
                </div>
                <div class="order-details">
                    <p>Thank you for your order. We will send you an email when your order is shipped.</p>
                    <p>Here are the details:</p>
                    <p class="order-id" style="font-size: 18px; color: #007BFF;">Order ID: ${orderId}</p> <!-- Larger and in blue -->
                    <p style="font-size: 18px; color: #007BFF;">Payment ID: ${paymentId}</p> <!-- Larger and in blue -->
                    <!-- Product List -->
                    <table>
                        <thead>
                            <tr>
                                <th>${products.length > 1 ? 'Products' : 'Product'}</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productRows}
                        </tbody>
                    </table>
                </div>
                <!-- Address Details -->
                <div class="address">
                    <h3>Shipping Address:</h3>
                    <p>Name: ${address.firstName} ${address.lastName}</p>
                    <p>Email: ${address.email}</p>
                    <p>Phone: ${address.phone}</p>
                    <p>Address: ${address.address}</p>
                    <p>Address Detail: ${address.addressDetail}</p>
                    <p>City: ${address.city}</p>
                    <p>Pincode: ${address.pincode}</p>
                </div>
                <!-- Additional Information -->
                <div class="additional-info">
                    <p><strong>Important Note:</strong></p>
                    <p>Once a product is shipped, changes to the order address and order cancellation will not be possible. Our shipping process typically takes approximately 1 hour to complete, so any desired changes should be made within this window.</p>
                    <p>Please expect delivery of your product within 7 to 15 days.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export const addressChangesTemplate = ({ orderId, product, address }) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                /* Your CSS styles for the email here */
                /* You can reuse the CSS from the order confirmation template if it fits your design. */
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Address Change Notification</h1>
                </div>
                <div class="order-details">
                    <p>We have received a request to change the shipping address for your order:</p>
                    <p>Order ID: ${orderId}</p>
                    <!-- Product Details -->
                    <div class="product">
                        <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
                        <h4>${product.title}</h4>
                        <p>Price: ₹${product.price}</p>
                        <p>Quantity: ${product.quantity}</p>
                    </div>
                </div>
                <!-- New Address Details -->
                <div class="address">
                    <h3>New Shipping Address:</h3>
                    <p>Name: ${address.firstName} ${address.lastName}</p>
                    <p>Email: ${address.email}</p>
                    <p>Phone: ${address.phone}</p>
                    <p>Address: ${address.address}</p>
                    <p>Address Detail: ${address.addressDetail}</p>
                    <p>City: ${address.city}</p>
                    <p>Pincode: ${address.pincode}</p>
                    <p>Landmark: ${address.landmark}</p>
                </div>
                <!-- Additional Information -->
                <div class="additional-info">
                    <p><strong>Important Note:</strong></p>
                    <p>Your address change request is being processed. If you did not request this change, please contact us immediately.</p>
                    <p>For any further questions or concerns, please don't hesitate to reach out to our customer support.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export const orderCancellationTemplate = ({ orderId, product, address }) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                /* Your CSS styles for the email here */
                /* You can reuse the CSS from the order confirmation template if it fits your design. */
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Order Cancellation Confirmation</h1>
                </div>
                <div class="order-details">
                    <p>We regret to inform you that your order has been canceled:</p>
                    <p>Order ID: ${orderId}</p>
                    <!-- Product Details -->
                    <div class="product">
                        <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
                        <h4>${product.title}</h4>
                        <p>Price: ₹${product.price}</p>
                        <p>Price: ${product.quantity}</p>
                    </div>
                </div>
                <!-- Address Details -->
                <div class="address">
                    <h3>Shipping Address:</h3>
                    <p>Name: ${address.firstName} ${address.lastName}</p>
                    <p>Email: ${address.email}</p>
                    <p>Phone: ${address.phone}</p>
                    <p>Address: ${address.address}</p>
                    <p>Address Detail: ${address.addressDetail}</p>
                    <p>City: ${address.city}</p>
                    <p>Pincode: ${address.pincode}</p>
                    <p>Landmark: ${address?.landmark}</p>
                </div>
                <!-- Additional Information -->
                <div class="additional-info">
                    <p><strong>Important Note:</strong></p>
                    <p>Your order cancellation has been processed. If you believe this was done in error or have any questions, please contact our customer support immediately.</p>
                    <p>Refunds for canceled orders will be processed according to our refund policy.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export const orderCancelledTemplate = ({ orderId, product, address }) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          /* Email template CSS styles go here */
  
          /* Responsive design */
          @media screen and (max-width: 600px) {
            .email-container {
              width: 100%;
              padding: 10px;
            }
            .header h1 {
              font-size: 20px;
            }
            .order-details p {
              font-size: 16px;
            }
            .product img {
              max-width: 50px;
            }
            .address h3 {
              font-size: 18px;
            }
            .address p {
              font-size: 14px;
            }
            .additional-info p {
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Order Cancelled!</h1>
          </div>
          <div class="order-details">
            <p>With a touch of regret, we inform you that your order has been canceled:</p>
            <p>Order ID: ${orderId}</p>
            <div class="product">
              <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
              <h4>${product.title}</h4>
              <p>Price: ₹${product.price}</p>
              <p>Quantity: ${product.quantity}</p>
            </div>
          </div>
          <div class="address">
            <h3>Shipping Address:</h3>
            <p>Name: ${address.firstName} ${address.lastName}</p>
            <p>Email: ${address.email}</p>
            <p>Phone: ${address.phone}</p>
            <p>Address: ${address.address}</p>
            <p>Address Detail: ${address.addressDetail}</p>
            <p>City: ${address.city}</p>
            <p>Pincode: ${address.pincode}</p>
            <p>Landmark: ${address?.landmark}</p>
          </div>
          <div class="additional-info">
            <p><strong>Important Note:</strong></p>
            <p>Your order cancellation has been processed. If you believe this was done in error or have any questions, please contact our customer support immediately.</p>
            <p>Refunds for canceled orders will be processed according to our refund policy.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};

export const orderShippedTemplate = ({ orderId, product, address }) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          /* Email template CSS styles go here */
  
          /* Responsive design */
          @media screen and (max-width: 600px) {
            .email-container {
              width: 100%;
              padding: 10px;
            }
            .header h1 {
              font-size: 20px;
            }
            .order-details p {
              font-size: 16px;
            }
            .product img {
              max-width: 50px;
            }
            .address h3 {
              font-size: 18px;
            }
            .address p {
              font-size: 14px;
            }
            .additional-info p {
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Order Shipped!</h1>
          </div>
          <div class="order-details">
            <p>Your order has been successfully shipped:</p>
            <p>Order ID: ${orderId}</p>
            <div class="product">
              <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
              <h4>${product.title}</h4>
              <p>Price: ₹${product.price}</p>
              <p>Quantity: ${product.quantity}</p>
            </div>
          </div>
          <div class="address">
            <h3>Shipping Address:</h3>
            <p>Name: ${address.firstName} ${address.lastName}</p>
            <p>Email: ${address.email}</p>
            <p>Phone: ${address.phone}</p>
            <p>Address: ${address.address}</p>
            <p>Address Detail: ${address.addressDetail}</p>
            <p>City: ${address.city}</p>
            <p>Pincode: ${address.pincode}</p>
            <p>Landmark: ${address?.landmark}</p>
          </div>
          <div class="additional-info">
            <p><strong>Important Note:</strong></p>
            <p>Your order has been shipped and is on its way to you. You will receive tracking information shortly. If you have any questions or concerns, please contact our customer support.</p>
            <p>Thank you for shopping with us!</p>
          </div>
        </div>
      </body>
      </html>
    `;
};

export const orderDeliveredTemplate = ({ orderId, product, address }) => {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          /* Email template CSS styles go here */
  
          /* Responsive design */
          @media screen and (max-width: 600px) {
            .email-container {
              width: 100%;
              padding: 10px;
            }
            .header h1 {
              font-size: 20px;
            }
            .order-details p {
              font-size: 16px;
            }
            .product img {
              max-width: 50px;
            }
            .address h3 {
              font-size: 18px;
            }
            .address p {
              font-size: 14px;
            }
            .additional-info p {
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Order Delivered!</h1>
          </div>
          <div class="order-details">
            <p>We are pleased to inform you that your order has been successfully delivered:</p>
            <p>Order ID: ${orderId}</p>
            <div class="product">
              <img src="${product.image}" alt="${product.title}" style="max-width: 100px;">
              <h4>${product.title}</h4>
              <p>Price: ₹${product.price}</p>
              <p>Quantity: ${product.quantity}</p>
            </div>
          </div>
          <div class="address">
            <h3>Shipping Address:</h3>
            <p>Name: ${address.firstName} ${address.lastName}</p>
            <p>Email: ${address.email}</p>
            <p>Phone: ${address.phone}</p>
            <p>Address: ${address.address}</p>
            <p>Address Detail: ${address.addressDetail}</p>
            <p>City: ${address.city}</p>
            <p>Pincode: ${address.pincode}</p>
            <p>Landmark: ${address?.landmark}</p>
          </div>
          <div class="additional-info">
            <p><strong>Important Note:</strong></p>
            <p>Your order has been successfully delivered. If you have any questions or encounter any issues with your order, please don't hesitate to contact our customer support.</p>
            <p>Thank you for choosing us for your shopping needs!</p>
          </div>
        </div>
      </body>
      </html>
    `;
};

export const adminOrderNotificationTemplate = ({ orderId, paymentId, products, address }) => {
  const productRows = products.map((product) => `
      <tr>
          <td>
              <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                  <img src="${product.image}" alt="${product.title}" style="max-width: 100px; margin: 0 auto 10px;">
                  <h4 style="font-size: 18px; margin: 0;">${product.title}</h4>
              </div>
          </td>
          <td>₹${product.price}</td>
          <td>${product.quantity}</td>
      </tr>
  `).join('');

  return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f2f2f2;
              }
              .email-container {
                  max-width: 100%;
                  background-color: #ffffff;
                  padding: 20px;
                  border: 1px solid #ccc;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #007BFF;
                  color: #fff;
                  text-align: center;
                  padding: 20px;
                  border-radius: 5px 5px 0 0;
              }
              .header h1 {
                  font-size: 24px;
              }
              .order-details {
                  margin: 20px 0;
              }
              .order-details p {
                  margin: 10px 0;
                  font-size: 16px;
              }
              .product {
                  background-color: #f9f9f9;
                  border: 1px solid #ccc;
                  padding: 20px;
                  margin: 20px 0;
                  border-radius: 5px;
              }
              .product img {
                  max-width: 100px;
              }
              .address {
                  background-color: #f9f9f9;
                  border: 1px solid #ccc;
                  padding: 20px;
                  border-radius: 5px;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
              }
              th, td {
                  border: 1px solid #ccc;
                  padding: 10px;
                  text-align: left;
              }

              @media screen and (max-width: 600px) {
                  .product td {
                      display: block;
                      text-align: center;
                  }
                  .product img {
                      margin: 0 auto 10px;
                  }
              }
          </style>
      </head>
      <body>
          <div class "email-container">
              <div class="header">
                  <h1>New Order Notification</h1>
              </div>
              <div class="order-details">
                  <p>A new order has been placed. Here are the details:</p>
                  <p class="order-id" style="font-size: 18px; color: #007BFF;">Order ID: ${orderId}</p>
                  <p style="font-size: 18px; color: #007BFF;">Payment ID: ${paymentId}</p>
                  <table>
                      <thead>
                          <tr>
                              <th>${products.length > 1 ? 'Products' : 'Product'}</th>
                              <th>Price</th>
                              <th>Quantity</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${productRows}
                      </tbody>
                  </table>
              </div>
              <div class="address">
                  <h3>Shipping Address:</h3>
                  <p>Name: ${address.firstName} ${address.lastName}</p>
                  <p>Email: ${address.email}</p>
                  <p>Phone: ${address.phone}</p>
                  <p>Address: ${address.address}</p>
                  <p>Address Detail: ${address.addressDetail}</p>
                  <p>City: ${address.city}</p>
                  <p>Pincode: ${address.pincode}</p>
              </div>
          </div>
      </body>
      </html>
  `;
};

export const contactEmailTemplate = ({ firstName, lastName, email, phone, subject, message }) => {
  return `
 <!DOCTYPE html>
 <html>
 <head>
     <style>
         body {
             font-family: Arial, sans-serif;
             background-color: #f2f2f2;
         }
         .email-container {
             max-width: 600px;
             background-color: #ffffff;
             padding: 20px;
             border: 1px solid #ccc;
             box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
         }
         .header {
             background-color: #007BFF;
             color: #fff;
             text-align: center;
             padding: 20px;
             border-radius: 5px 5px 0 0;
         }
         .header h1 {
             font-size: 24px;
         }
         .contact-details {
             margin: 20px 0;
         }
         .contact-details p {
             margin: 10px 0;
             font-size: 16px;
         }
         .message {
             background-color: #f9f9f9;
             border: 1px solid #ccc;
             padding: 20px;
             border-radius: 5px;
         }
         .message p {
             margin: 10px 0;
         }
     </style>
 </head>
 <body>
     <div class="email-container">
         <div class="header">
             <h1>Contact Form Submission - ${process.env.NEXT_PUBLIC_APP_NAME}</h1>
         </div>
         <div class="contact-details">
             <p>Thank you for getting in touch. Here are the details of the message:</p>
             <p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Subject:</strong> ${subject}</p>
         </div>
         <div class="message">
             <p><strong>Message:</strong></p>
             <p>${message}</p>
         </div>
     </div>
 </body>
 </html>
`;
}