export interface CheckoutSession {
  url: string;
}

/** Minimal shape any payable record (order, legacy appointment, ...) needs. */
export interface Payable {
  id: string;
  amount_cents: number;
}

/**
 * Client-safe entry point — the actual gateway call (Mercado Pago
 * Checkout Pro) happens in app/api/checkout/route.ts, since it needs
 * MERCADOPAGO_ACCESS_TOKEN, which must never reach the browser bundle.
 */
export const paymentService = {
  async createCheckout(payable: Payable): Promise<CheckoutSession> {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: payable.id }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error ?? "Não foi possível iniciar o pagamento.");
    }

    return response.json();
  },
};
