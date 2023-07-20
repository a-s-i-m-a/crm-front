import {Product} from "../store/productsStore";
import "../css/Modal.css"
import Barcode from "react-barcode";
import { SellProduct } from '../store/cartSore'

interface ProductModalProps {
    product: Product;
    isEditing: boolean;
    updatedProduct: Product;
    onClose: () => void;
    onSell: (product: SellProduct) => void;
    onEdit: () => void;
    onSave: () => void;
    onDelete: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
                                                       product,
                                                       isEditing,
                                                       updatedProduct,
                                                       onClose,
                                                       onEdit,
                                                       onSave,
                                                       onDelete,
                                                       onInputChange,
                                                       onSell
                                                   }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <div className="modal-body">
                    <h2 className="title">{product.title}</h2>
                    <p>Price: ${product.soldPrice}</p>
                    <p>
                        In Stock:
                        {isEditing ? (
                            <input
                                type="checkbox"
                                name="isInStock"
                                checked={updatedProduct.isInStock}
                                onChange={onInputChange}
                            />
                        ) : (
                            product.isInStock ? 'Yes' : 'No'
                        )}
                    </p>
                    <p>
                        Count:
                        {isEditing ? (
                            <input
                                type="number"
                                name="count"
                                value={updatedProduct.count}
                                onChange={onInputChange}
                            />
                        ) : (
                            product.count
                        )}
                    </p>
                    <p>
                        Sizes:
                        {isEditing ? (
                            <input
                                type="text"
                                name="sizes"
                                value={updatedProduct.sizes}
                                onChange={onInputChange}
                            />
                        ) : (
                            product.sizes
                        )}
                    </p>
                    <p>
                        Color:
                        {isEditing ? (
                            <input
                                type="text"
                                name="color"
                                value={updatedProduct.color}
                                onChange={onInputChange}
                            />
                        ) : (
                            product.color
                        )}
                    </p>
                    <p>
                        Sold Price:
                        {isEditing ? (
                            <input
                                type="number"
                                name="soldPrice"
                                value={updatedProduct.soldPrice}
                                onChange={onInputChange}
                            />
                        ) : (
                            `$${product.soldPrice}`
                        )}
                    </p>
                    <p>
                        Bought Price:
                        {isEditing ? (
                            <input
                                type="number"
                                name="boughtPrice"
                                value={updatedProduct.boughtPrice}
                                onChange={onInputChange}
                            />
                        ) : (
                            `$${product.boughtPrice}`
                        )}
                    </p>
                    <p>
                        Title:
                        {isEditing ? (
                            <input
                                type="text"
                                name="title"
                                value={updatedProduct.title}
                                onChange={onInputChange}
                            />
                        ) : (
                            product.title
                        )}
                    </p>
                   <Barcode value={`${product.barcode}`} />
                    {isEditing ? (
                        <button className="save-button" onClick={onSave}>
                            Save
                        </button>
                    ) : (
                        <div className="buttons">
                            <button className="edit-button" onClick={onEdit}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={onDelete}>
                                Delete
                            </button>
                            <button className="sell-button" onClick={()=>onSell(product)}>
                                Sell
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>)}

export default ProductModal;

