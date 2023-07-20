import {Product} from "../store/productsStore";
import {useContext, useEffect, useState} from "react";
import ProductModal from "../components/Modal";
import ProductCard from "../components/ProductCard";
import {appStoreContext} from "../store/context.store";
import {observer} from "mobx-react-lite";
import "../css/ProductsPage.css"
import Pagination from "../components/Pagination";
import Cart from "../components/Cart";
import AddProductModal from "../components/AddProductModal";
import {SellProduct} from "../store/cartSore";

const ProductList: React.FC = observer(() => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedProduct, setUpdatedProduct] = useState<any | null>(null);
    const { productStore, cartStore } = useContext(appStoreContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdatedList, setIsUpdatedList] = useState(false)
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)


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
    }, [isUpdatedList,productStore, productStore.currentPage]);

    const handleAddProduct = (newProduct: Partial<Product>) => {
        productStore.addProduct(newProduct);
    };

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

    const handleSellProduct = (product: SellProduct) => {
        cartStore.addToCart(product);
    }



    return (
        <div className="products-container">
            <Cart setIsUpdatedList={setIsUpdatedList}/>
            <div className="list-container">
                <h1>Products List</h1>
                <input
                    type="text"
                    placeholder="Search by title or barcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="add-product-button"
                    onClick={()=>setIsAddProductModalOpen(true)}
                >
                    Add New Product
                </button>
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
                        onSell={handleSellProduct}
                        onEdit={handleEditProduct}
                        onSave={handleSaveProduct}
                        onInputChange={handleInputChange}
                        onDelete={handleDeleteProduct}
                    />
                )}
                {isAddProductModalOpen && (
                    <AddProductModal onClose={() => setIsAddProductModalOpen(false)} onAddProduct={handleAddProduct} />
                )}
                <Pagination
                    currentPage={productStore.currentPage}
                    isNextDisabled={productStore.products.length < 10}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                />
            </div>
    </div>

    );
});

export default ProductList;
