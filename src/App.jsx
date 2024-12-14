import { useState, useEffect } from "react";
import "./App";
import { Simulate } from "react-dom/test-utils";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState(false);
  const [cartItems, setCartItems] = useState([]); // renamed state to avoid conflict
  const [showCart, setShowCart] = useState(false); // to toggle cart view

  const countIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log('Failed to fetch data', error);
      });
  }, []);

  const divStyle = {
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    gap: "100px",
  };

  const items = {
    width: "100%",
  };

  const content = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
  };

  const handleClick = (item) => {
    console.log(item);

    // Check if item is already in the cart
    let isPresent = false;
    cartItems.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });

    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }

    // Add item to cart
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, item];
      countIncrease(); // Correct count increase on button click
      return newCartItems;
    });
  };

  const handleRemove = (itemId) => {
    // Remove item from cart
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter((item) => item.id !== itemId);
      setCount(updatedCart.length); // Update the cart count after removal
      return updatedCart;
    });
  };

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  return (
    <div style={items}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", backgroundColor: "skyblue", padding: "10px" }}>
        <nav>My Shopping</nav>
        <button id="cart" onClick={toggleCart}>
          Cart <span>{count}</span>
          {warning && <div className="warning">Item is already added to your cart</div>}
        </button>
      </div>

      {/* Cart Popup */}
      {showCart && (
        <div style={{ position: "absolute", top: "50px", right: "20px", width: "300px", backgroundColor: "white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", padding: "20px", borderRadius: "8px" }}>
          <h3>Your Cart</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span>{item.title}</span>
                  <button onClick={() => handleRemove(item.id)} style={{ backgroundColor: "red", color: "white", padding: "5px", borderRadius: "5px" }}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={toggleCart} style={{ marginTop: "10px", backgroundColor: "skyblue", padding: "10px" }}>Close</button>
        </div>
      )}

      {/* Product List */}
      <ul style={content}>
        {posts.map((dat) => (
          <li key={dat.id} style={{ display: "flex", margin: "20px" }}>
            <div style={divStyle}>
              <img src={dat.image} alt={dat.title} style={{ width: "200px", height: "200px" }} />
              <h2>{dat.title}</h2>
              <h3>₹{dat.price}</h3>
              <p>{dat.description}</p>
              <h3 style={{ color: "green" }}>{dat.category}</h3>
              <div style={{ display: "flex", justifyContent: "space-around", padding:"20px" }}><span>{dat.rating.rate}</span><span style={{color: "red"}}>({dat.rating.count} ratings)</span></div>
              <div style ={{display:"flex", justifyContent: "center"}}><button onClick={() => handleClick(dat)} style={{ backgroundColor: "skyblue", padding: "10px",  }}>
                Add to Cart
              </button></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
