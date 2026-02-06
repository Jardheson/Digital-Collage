
const REGIONS = {
  SP: { price: 15.90, days: 3 },
  RJ: { price: 22.90, days: 5 },
  MG: { price: 24.90, days: 6 },
  ES: { price: 26.90, days: 6 },
  
  // Sul
  PR: { price: 29.90, days: 6 },
  SC: { price: 32.90, days: 7 },
  RS: { price: 34.90, days: 8 },
  
  // Centro-Oeste
  DF: { price: 35.90, days: 5 },
  GO: { price: 38.90, days: 7 },
  MT: { price: 42.90, days: 9 },
  MS: { price: 40.90, days: 8 },
  
  // Nordeste (Médio)
  BA: { price: 45.90, days: 9 },
  PE: { price: 48.90, days: 10 },
  CE: { price: 49.90, days: 11 },
  // ... outros NE padronizados
  DEFAULT_NE: { price: 52.90, days: 12 },
  
  // Norte
  AM: { price: 65.90, days: 15 },
  PA: { price: 58.90, days: 14 },
  // ... outros NO padronizados
  DEFAULT_NO: { price: 72.90, days: 18 }
};

export const calculateShipping = async (cep: string, subtotal: number): Promise<{ price: number; days: number; location: string } | null> => {
  const cleanCep = cep.replace(/\D/g, '');
  
  if (cleanCep.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();

    if (data.erro) return null;

    const uf = data.uf as keyof typeof REGIONS;
    let rate = { price: 45.00, days: 10 }; // Default Brasil

    // Regras de Frete Grátis
    if (subtotal >= 399) {
      return {
        price: 0,
        days: (REGIONS[uf] || rate).days + 2, // Econômico demora um pouco mais
        location: `${data.localidade} - ${data.uf}`
      };
    }

    // Identifica Região
    if (REGIONS[uf]) {
      rate = REGIONS[uf];
    } else {
        // Fallbacks Regionais simples
        const regionNorth = ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'];
        const regionNortheast = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];
        
        if (regionNorth.includes(uf)) rate = REGIONS.DEFAULT_NO;
        else if (regionNortheast.includes(uf)) rate = REGIONS.DEFAULT_NE;
    }

    return {
      price: rate.price,
      days: rate.days,
      location: `${data.localidade} - ${data.uf}`
    };

  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    return null;
  }
};
