/**
 * PhonePe Payment Gateway Error Codes
 * As per official PhonePe documentation
 * https://developer.phonepe.com/payment-gateway
 */

export const PHONEPE_ERROR_CODES: Record<string, { message: string; userMessage: string }> = {
  // Success Codes
  PAYMENT_SUCCESS: {
    message: 'Payment completed successfully',
    userMessage: 'Payment successful! You now have full access.',
  },
  PAYMENT_PENDING: {
    message: 'Payment is pending',
    userMessage: 'Your payment is being processed. Please wait.',
  },

  // Error Codes
  PAYMENT_ERROR: {
    message: 'Payment failed due to error',
    userMessage: 'Payment failed. Please try again.',
  },
  PAYMENT_DECLINED: {
    message: 'Payment declined by bank',
    userMessage: 'Your payment was declined. Please try a different payment method.',
  },
  BAD_REQUEST: {
    message: 'Invalid request parameters',
    userMessage: 'Something went wrong. Please try again.',
  },
  AUTHORIZATION_FAILED: {
    message: 'Authorization failed',
    userMessage: 'Payment authorization failed. Please try again.',
  },
  INTERNAL_SERVER_ERROR: {
    message: 'PhonePe internal server error',
    userMessage: 'Payment service temporarily unavailable. Please try again later.',
  },
  TRANSACTION_NOT_FOUND: {
    message: 'Transaction not found',
    userMessage: 'Payment not found. Please contact support.',
  },
  PAYMENT_CANCELLED: {
    message: 'Payment cancelled by user',
    userMessage: 'You cancelled the payment.',
  },
  TIMED_OUT: {
    message: 'Payment timed out',
    userMessage: 'Payment timed out. Please try again.',
  },

  // Refund Codes
  REFUND_SUCCESS: {
    message: 'Refund processed successfully',
    userMessage: 'Your refund has been processed.',
  },
  REFUND_PENDING: {
    message: 'Refund is pending',
    userMessage: 'Your refund is being processed.',
  },
  REFUND_FAILED: {
    message: 'Refund failed',
    userMessage: 'Refund failed. Please contact support.',
  },

  // Common Errors
  INSUFFICIENT_FUNDS: {
    message: 'Insufficient funds in account',
    userMessage: 'Insufficient balance. Please try a different payment method.',
  },
  CARD_EXPIRED: {
    message: 'Card has expired',
    userMessage: 'Your card has expired. Please use a different card.',
  },
  INVALID_CARD: {
    message: 'Invalid card details',
    userMessage: 'Invalid card details. Please check and try again.',
  },
  LIMIT_EXCEEDED: {
    message: 'Transaction limit exceeded',
    userMessage: 'Transaction limit exceeded. Please try a smaller amount.',
  },
};

/**
 * Get user-friendly error message for PhonePe error code
 */
export function getPhonePeErrorMessage(code: string): string {
  const error = PHONEPE_ERROR_CODES[code];
  if (error) {
    return error.userMessage;
  }
  return 'Payment failed. Please try again or contact support.';
}

/**
 * Get technical error message for logging
 */
export function getPhonePeTechnicalMessage(code: string): string {
  const error = PHONEPE_ERROR_CODES[code];
  if (error) {
    return error.message;
  }
  return `Unknown PhonePe error code: ${code}`;
}

/**
 * Check if payment was successful
 */
export function isPaymentSuccessful(code: string): boolean {
  return code === 'PAYMENT_SUCCESS';
}

/**
 * Check if payment is pending
 */
export function isPaymentPending(code: string): boolean {
  return code === 'PAYMENT_PENDING';
}

/**
 * Check if payment failed
 */
export function isPaymentFailed(code: string): boolean {
  return !isPaymentSuccessful(code) && !isPaymentPending(code);
}


