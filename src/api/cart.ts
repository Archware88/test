import { get, post, del } from "./api"; // Assuming these are pre-configured methods
import { ICartItem, ICourse } from "../types/types"; // Assuming these types exist

/**
 * Adds a course to the user's cart
 * @param courseId - ID of the course to add
 * @returns Promise with the updated cart or null if failed
 */
export const addToCart = async (
  courseId: string | number
): Promise<boolean> => {
  try {
    const response = await post<{
      status: boolean;
      message: string;
      cart: ICartItem[];
    }>(`/course/${courseId}/add-to-cart`);

    return response.status;
  } catch (error) {
    console.error("Add to cart API error:", error);
    return false;
  }
};


/**
 * Gets all items in the user's cart
 * @returns Promise with cart items array or null if failed
 */
export const getCartItems = async (): Promise<ICartItem[] | null> => {
  try {
    const response = await get<{
      status: boolean;
      cart_courses: ICartItem[];
    }>("/get-course-cart");

    return response.status ? response.cart_courses : null;
  } catch (error) {
    console.error("Get cart items API error:", error);
    return null;
  }
};

/**
 * Removes an item from the cart
 * @param courseId - ID of the course to remove
 * @returns Promise with success status
 */
export const removeFromCart = async (
  courseId: string | number
): Promise<boolean> => {
  try {
    const response = await del<{
      status: boolean;
      message: string;
    }>(`/remove-from-cart/${courseId}`);

    return response.status;
  } catch (error) {
    console.error("Remove from cart API error:", error);
    return false;
  }
};

/**
 * Checks out the cart and processes payment
 * @param paymentMethod - Selected payment method
 * @returns Promise with order confirmation or null if failed
 */
export const checkoutCart = async (
  paymentMethod: string
): Promise<{
  orderId: string;
  courses: ICourse[];
} | null> => {
  try {
    const response = await post<{
      status: boolean;
      order: {
        orderId: string;
        courses: ICourse[];
      };
    }>("/checkout", { paymentMethod });

    return response.status ? response.order : null;
  } catch (error) {
    console.error("Checkout API error:", error);
    return null;
  }
};

/**
 * Gets cart item count
 * @returns Promise with item count
 */
export const getCartItemCount = async (): Promise<number> => {
  try {
    const cart = await getCartItems();
    return cart ? cart.length : 0;
  } catch (error) {
    console.error("Get cart count error:", error);
    return 0;
  }
};

/**
 * Checks if a course is already in the cart
 * @param courseId - ID of the course to check
 * @returns Promise with boolean indicating if course exists in cart
 */
export const isCourseInCart = async (
  courseId: string | number
): Promise<boolean> => {
  try {
    const cart = await getCartItems();
    return cart ? cart.some((item) => item?.course?.id === courseId) : false;
  } catch (error) {
    console.error("Check course in cart error:", error);
    return false;
  }
};
