import axios from "axios";

const API_URL = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/reviews/submit";

export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(API_URL, {
      customerId: reviewData.customerId,
      productId: reviewData.productId,
      rating: reviewData.rating,
      comment: reviewData.comment
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(`https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/api/v1/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}
