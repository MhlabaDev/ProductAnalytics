import "../App.css"; 

const ProductCard = ({ product, onCardClick }) => {
  return (
    <div className="product-card" onClick={() => onCardClick(product)}>
      <div className="image-container">
        <img
          src={product.image || "https://via.placeholder.com/240x150"}
          alt={product.description || "Product Image"}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.description || "Unnamed Product"}</h2>
        <span className="product-category">{product.category || "No Category"}</span>
        <p className="unit-price">Unit Price: R{product.salePrice?.toFixed(2) ?? "0.00"}</p>
      </div>
    </div>
  );
};

export default ProductCard;
