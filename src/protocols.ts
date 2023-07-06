export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type ViaCEPAddressResponse = Omit<ViaCEPAddress, 'cidade'> & {
  localidade: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export type ViaCEPAddressError = {
  erro: boolean;
}

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};
