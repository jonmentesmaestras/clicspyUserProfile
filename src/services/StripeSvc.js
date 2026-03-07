class StripeSvc {
  constructor() {
    if (StripeSvc.instance) {
      return StripeSvc.instance;
    }
    StripeSvc.instance = this;
  }

  /**
   * Cancel a user's subscription in Stripe
   * @param {string} endpoint - The Stripe cancel endpoint
   * @param {Object} payload - The data to send (e.g. customerID, feedback)
   */
  async cancelSubscription(endpoint, payload) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      };
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        return { error: true, code: response.status, messages: data.msg || data.error || 'Stripe error' };
      }

      return { status_code: response.status, data: data, error: false };
    } catch (error) {
      return { error: true, code: 500, messages: error.message || 'Unexpected error' };
    }
  }

  /**
   * Mock: Cancel a user's subscription in Stripe
   * simulating a 2-second delay and returning fake success data.
   */
  async cancelSubscriptionMock(endpoint, payload) {
    console.log("MOCK STRIPE call to endpoint:", endpoint, "with payload:", payload);
    const { response200 } = require("../mocks/reponseCancelStripe");

    return new Promise((resolve) => {
      setTimeout(() => {
        // Envolvemos al estilo del wrapper real
        resolve({
          status_code: 200,
          data: response200,
          error: false
        });
      }, 2000); // Simulamos 2 segundos en responder
    });
  }
}

const instance = new StripeSvc();

export default instance;
