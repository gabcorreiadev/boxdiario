/** Nome em português de cada GP, pela chave "raceName" da Jolpica. */
const PT: Record<string, [string, string]> = {
  "Australian Grand Prix": ["GP da Austrália", "Austrália"],
  "Chinese Grand Prix": ["GP da China", "China"],
  "Japanese Grand Prix": ["GP do Japão", "Japão"],
  "Bahrain Grand Prix": ["GP do Bahrein", "Bahrein"],
  "Bahrain Grand Prix in Malaysia": ["GP do Bahrein (na Malásia)", "Bahrein"],
  "Saudi Arabian Grand Prix": ["GP da Arábia Saudita", "Arábia Saudita"],
  "Miami Grand Prix": ["GP de Miami", "Miami"],
  "Canadian Grand Prix": ["GP do Canadá", "Canadá"],
  "Monaco Grand Prix": ["GP de Mônaco", "Mônaco"],
  "Barcelona Grand Prix": ["GP de Barcelona", "Barcelona"],
  "Spanish Grand Prix": ["GP da Espanha", "Espanha"],
  "Austrian Grand Prix": ["GP da Áustria", "Áustria"],
  "British Grand Prix": ["GP da Inglaterra", "Inglaterra"],
  "Belgian Grand Prix": ["GP da Bélgica", "Bélgica"],
  "Hungarian Grand Prix": ["GP da Hungria", "Hungria"],
  "Dutch Grand Prix": ["GP da Holanda", "Holanda"],
  "Italian Grand Prix": ["GP da Itália", "Itália"],
  "Azerbaijan Grand Prix": ["GP do Azerbaijão", "Azerbaijão"],
  "Singapore Grand Prix": ["GP de Singapura", "Singapura"],
  "United States Grand Prix": ["GP dos EUA", "EUA"],
  "Mexico City Grand Prix": ["GP da Cidade do México", "México"],
  "Brazilian Grand Prix": ["GP de São Paulo", "São Paulo"],
  "São Paulo Grand Prix": ["GP de São Paulo", "São Paulo"],
  "Las Vegas Grand Prix": ["GP de Las Vegas", "Las Vegas"],
  "Qatar Grand Prix": ["GP do Catar", "Catar"],
  "Abu Dhabi Grand Prix": ["GP de Abu Dhabi", "Abu Dhabi"],
};

export function racePt(raceName: string): { name: string; short: string } {
  const hit = PT[raceName];
  if (hit) return { name: hit[0], short: hit[1] };
  const short = raceName.replace(/ Grand Prix.*$/, "");
  return { name: `GP ${short}`, short };
}
