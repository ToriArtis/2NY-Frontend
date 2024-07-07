import { useCart } from '../hooks/useCart';
import { Cart } from '../models/Carts';

// 장바구니 리스트 뷰모델
export function CartsListViewModel() {
    const {
        carts,
        error,
        loading,
        hasMore,
        loadMoreCarts,
        updateItemQuantity,
        removeItemFromCart
    } = useCart();

    // 총 상품 금액 계산
    const totalPrice = carts.reduce((sum, cart) => sum + (cart instanceof Cart ? cart.getTotalPrice() : 0), 0);
    // 총 할인 금액 계산
    const totalDiscountAmount = carts.reduce((sum, cart) => sum + (cart instanceof Cart ? cart.getDiscountAmount() : 0), 0);
    // 최종 결제 금액 계산
    const finalTotalPrice = carts.reduce((sum, cart) => sum + (cart instanceof Cart ? cart.getFinalPrice() : 0), 0);

    return {
        carts,
        error,
        loading,
        hasMore,
        loadMoreCarts,
        updateItemQuantity,
        removeItemFromCart,
        totalPrice,
        totalDiscountAmount,
        finalTotalPrice
    };
}