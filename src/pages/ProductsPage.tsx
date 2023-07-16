import {Product} from "../store/productsStore";
import {useContext, useEffect, useState} from "react";
import ProductModal from "../components/Modal";
import ProductCard from "../components/ProductCard";
import {appStoreContext} from "../store/context.store";
import {observer} from "mobx-react-lite";
import "../css/ProductsPage.css"

const ProductList: React.FC = observer(() => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedProduct, setUpdatedProduct] = useState<any | null>(null);
    const { productStore } = useContext(appStoreContext);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const delaySearch = setTimeout(() => {
            productStore.fetchProducts(searchQuery);
        }, 300);

        return () => {
            clearTimeout(delaySearch);
        };
    }, [searchQuery]);


    useEffect(() => {
        productStore.fetchProducts(searchQuery);
    }, [productStore, productStore.currentPage]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setUpdatedProduct(product);
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setUpdatedProduct(null);
        setIsEditing(false);
    };

    const handleEditProduct = () => {
        setIsEditing(true);
    };

    const handleDeleteProduct = () => {
        productStore.deleteProduct(selectedProduct?.id)
        handleCloseModal()
    };

    const handleSaveProduct = () => {
        productStore.editProduct( updatedProduct)
        setIsEditing(false);
        handleCloseModal()
    };

    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setUpdatedProduct((prevProduct: Product | null) => ({
            ...prevProduct,
            [name]: value,
        }));
    };


    const handlePrevPage = () => {
        productStore.setCurrentPage(productStore.currentPage-1)
    };

    const handleNextPage = () => {
        productStore.setCurrentPage(productStore.currentPage+1)
    };



    return (
        <div className="list-container">
            <h1>Products List</h1>
            <input
                type="text"
                placeholder="Search by title or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="product-list">
                {productStore.products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={handleProductClick}/>
                ))}
            </div>
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isEditing={isEditing}
                    updatedProduct={updatedProduct}
                    onClose={handleCloseModal}
                    onEdit={handleEditProduct}
                    onSave={handleSaveProduct}
                    onInputChange={handleInputChange}
                    onDelete={handleDeleteProduct}
                />
            )}
            <div className="pagination">
                <button
                    disabled={productStore.currentPage < 2}
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
                <button

                >
                    {productStore.currentPage}
                </button>
                <button
                    disabled={productStore.products.length < 10}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
});

export default ProductList;
