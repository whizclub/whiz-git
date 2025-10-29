/**
 * Mock PhonePe Payment Gateway
 * Use this for development when you don't have real PhonePe credentials
 * 
 * Enable by setting: PAYMENT_MODE="mock" in .env.local
 * Disable by setting: PAYMENT_MODE="live" in .env.local
 */

export interface MockPaymentResponse {
  success: boolean;
  code: string;
  message: string;
  data?: {
    merchantId: string;
    merchantTransactionId: string;
    transactionId: string;
    amount: number;
    state: string;
    responseCode: string;
    paymentInstrument?: {
      type: string;
    };
    instrumentResponse?: {
      redirectInfo?: {
        url: string;
      };
    };
  };
}

/**
 * Check if mock mode is enabled
 */
export function isMockMode(): boolean {
  return process.env.PAYMENT_MODE === 'mock';
}

/**
 * Generate mock payment initiation response
 */
export function mockPaymentInitiate(
  merchantTransactionId: string,
  amount: number,
  callbackUrl: string
): MockPaymentResponse {
  // Simulate PhonePe payment page URL
  const mockPaymentUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/payment/mock-page?txnId=${merchantTransactionId}&amount=${amount}&callback=${encodeURIComponent(callbackUrl)}`;

  return {
    success: true,
    code: 'PAYMENT_INITIATED',
    message: 'Payment initiated successfully',
    data: {
      merchantId: 'MOCK_MERCHANT',
      merchantTransactionId,
      transactionId: `MOCK_TXN_${Date.now()}`,
      amount,
      state: 'PENDING',
      responseCode: 'PENDING',
      instrumentResponse: {
        redirectInfo: {
          url: mockPaymentUrl,
        },
      },
    },
  };
}

/**
 * Generate mock payment callback response (success)
 */
export function mockPaymentSuccess(
  merchantTransactionId: string,
  amount: number
): MockPaymentResponse {
  return {
    success: true,
    code: 'PAYMENT_SUCCESS',
    message: 'Your payment is successful.',
    data: {
      merchantId: 'MOCK_MERCHANT',
      merchantTransactionId,
      transactionId: `MOCK_TXN_${Date.now()}`,
      amount,
      state: 'COMPLETED',
      responseCode: 'SUCCESS',
      paymentInstrument: {
        type: 'UPI',
      },
    },
  };
}

/**
 * Generate mock payment callback response (failure)
 */
export function mockPaymentFailure(
  merchantTransactionId: string,
  amount: number
): MockPaymentResponse {
  return {
    success: false,
    code: 'PAYMENT_ERROR',
    message: 'Payment failed. Please try again.',
    data: {
      merchantId: 'MOCK_MERCHANT',
      merchantTransactionId,
      transactionId: `MOCK_TXN_${Date.now()}`,
      amount,
      state: 'FAILED',
      responseCode: 'PAYMENT_ERROR',
    },
  };
}

/**
 * Generate mock payment status response
 */
export function mockPaymentStatus(
  merchantTransactionId: string,
  status: 'SUCCESS' | 'FAILED' | 'PENDING'
): MockPaymentResponse {
  if (status === 'SUCCESS') {
    return mockPaymentSuccess(merchantTransactionId, 9900);
  } else if (status === 'FAILED') {
    return mockPaymentFailure(merchantTransactionId, 9900);
  } else {
    return {
      success: true,
      code: 'PAYMENT_PENDING',
      message: 'Payment is pending.',
      data: {
        merchantId: 'MOCK_MERCHANT',
        merchantTransactionId,
        transactionId: `MOCK_TXN_${Date.now()}`,
        amount: 9900,
        state: 'PENDING',
        responseCode: 'PENDING',
      },
    };
  }
}

/**
 * Generate mock base64 response (for callback simulation)
 */
export function mockBase64Response(response: MockPaymentResponse): string {
  return Buffer.from(JSON.stringify(response)).toString('base64');
}

/**
 * Generate mock X-VERIFY header (for callback simulation)
 */
export function mockXVerify(): string {
  const mockChecksum = 'mock_checksum_' + Date.now();
  return `${mockChecksum}###1`;
}


