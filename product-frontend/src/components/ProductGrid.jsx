
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onCardClick }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default ProductGrid;
