
// Interface for the Mercado Pago config
export interface MercadoPagoConfig {
  publicKey: string;
  accessToken: string;
  apiKey: string;
}

// Get the stored configuration from localStorage
export const getMercadoPagoConfig = (): MercadoPagoConfig | null => {
  const savedConfig = localStorage.getItem('mercadoPagoConfig');
  if (!savedConfig) {
    console.error('Mercado Pago configuration not found in localStorage');
    return null;
  }
  
  try {
    const config = JSON.parse(savedConfig) as MercadoPagoConfig;
    
    // Verify that all required fields are present and not empty
    if (!config.publicKey || !config.accessToken || !config.apiKey) {
      console.error('Mercado Pago configuration is incomplete - missing required fields');
      return null;
    }
    
    return config;
  } catch (error) {
    console.error('Error parsing Mercado Pago config:', error);
    return null;
  }
};

// Function to check if the Mercado Pago configuration is valid
export const isMercadoPagoConfigured = (): boolean => {
  const config = getMercadoPagoConfig();
  return config !== null;
};

// Function to create a Mercado Pago payment
export const createPixPayment = async (
  amount: number,
  description: string,
  email: string,
  name: string
): Promise<{ id: string; qr_code: string; qr_code_base64: string } | null> => {
  const config = getMercadoPagoConfig();
  
  if (!config || !config.accessToken) {
    console.error('Mercado Pago configuration not found');
    return null;
  }
  
  try {
    // Create payment in Mercado Pago
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        transaction_amount: amount,
        description: description,
        payment_method_id: 'pix',
        payer: {
          email: email,
          first_name: name.split(' ')[0],
          last_name: name.split(' ').slice(1).join(' ') || ' '
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating payment:', errorData);
      return null;
    }
    
    const data = await response.json();
    
    // Return pix details from the response
    return {
      id: data.id,
      qr_code: data.point_of_interaction?.transaction_data?.qr_code || '',
      qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64 || ''
    };
  } catch (error) {
    console.error('Error creating PIX payment:', error);
    return null;
  }
};

// Function to check payment status
export const checkPaymentStatus = async (paymentId: string): Promise<'approved' | 'pending' | 'rejected' | 'error'> => {
  const config = getMercadoPagoConfig();
  
  if (!config || !config.accessToken) {
    console.error('Mercado Pago configuration not found');
    return 'error';
  }
  
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`
      }
    });
    
    if (!response.ok) {
      console.error('Error checking payment status:', await response.text());
      return 'error';
    }
    
    const data = await response.json();
    return data.status as 'approved' | 'pending' | 'rejected' | 'error';
  } catch (error) {
    console.error('Error checking payment status:', error);
    return 'error';
  }
};
