import { ApplicationError } from '@/protocols';

export function paymentRquiredError(): ApplicationError {
  return {
    name: 'PaymentRequiredError',
    message: 'Payment required or invalid type of ticket.',
  };
}
