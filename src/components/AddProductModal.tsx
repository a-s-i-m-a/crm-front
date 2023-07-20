import React, { useState } from 'react';
import { Product } from "../store/productsStore";

interface Props {
    onClose: () => void;
    onAddProduct: (product: Partial<Product>) => void;
}

const AddProductModal: React.FC<Props> = ({ onClose, onAddProduct }) => {
    const [newProduct, setNewProduct] = useState<Partial<Product>>({});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'sizes') {
            setNewProduct((prevProduct) => ({
                ...prevProduct,
                sizes: value.split(',').map((size) => size.trim()),
            }));
        } else {
            setNewProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,
            }));
        }
    };

    const handleAddProduct = () => {
        onAddProduct(newProduct);
        onClose();
    };

    return (
        <div className="add-product-modal">
            <h2>Add New Product</h2>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={newProduct.title || ''}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="count"
                placeholder="Count"
                value={newProduct.count || ''}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="sizes"
                placeholder="Sizes (comma separated)"
                value={newProduct.sizes  || ''}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="color"
                placeholder="Color"
                value={newProduct.color || ''}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="soldPrice"
                placeholder="Sold Price"
                value={newProduct.soldPrice || ''}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="boughtPrice"
                placeholder="Bought Price"
                value={newProduct.boughtPrice || ''}
                onChange={handleInputChange}
            />
            <button className="add" onClick={handleAddProduct}>Add Product</button>
            <button className="cancel" onClick={onClose}>Cancel</button>
        </div>

    );
};

export default AddProductModal;
