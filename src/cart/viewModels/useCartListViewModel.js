import { useCart } from '../hooks/useCart';

export function CartsListViewModel() {
    // useCart 훅에서 필요한 상태와 함수들을 가져옴
    const {
        carts,
        error,
        loading,
        page,
        totalPages,
        nextPage,
        prevPage,
        updateItemQuantity,
        removeItemFromCart
    } = useCart();

    // 총 상품 금액 계산
    const totalPrice = carts.reduce((sum, cart) => sum + cart.getTotalPrice(), 0);
    // 총 할인 금액 계산
    const totalDiscountAmount = carts.reduce((sum, cart) => sum + cart.getDiscountAmount(), 0);
    // 최종 결제 금액 계산
    const finalTotalPrice = carts.reduce((sum, cart) => sum + cart.getFinalPrice(), 0);

    // ViewModel에서 반환하는 값들
    return {
        carts,
        error,
        loading,
        page,
        totalPages,
        nextPage,
        prevPage,
        updateItemQuantity,
        removeItemFromCart,
        totalPrice,
        totalDiscountAmount,
        finalTotalPrice
    };
}