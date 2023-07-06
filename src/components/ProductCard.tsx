import {Product} from "../store/productsStore";

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div className="product-card" onClick={() => onClick(product)}>
            <h3 >{product.title}</h3>
            <p>Price: {product.soldPrice}coм</p>
            <p>Color: {product.color}</p>
            <p>Sizes: {product.sizes}</p>
        </div>
    );
};

export default ProductCard;
