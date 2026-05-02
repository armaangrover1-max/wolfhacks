export const BASE_WARDS = [
    {
      id: "castlemore",
      name: "Castlemore",
      score: 81,
      clinicAccess: 82,
      airQuality: 78,
      populationDensity: 38,
      housingDensity: 42,
      chronicDisease: 35,
      seniors: 34,
      sensorAQI: 31,
      temperature: 23,
      noise: 44,
      erHours: 130,
      shape: "M330 35 L455 55 L475 150 L350 165 L300 105 Z",
      summary: "Strong access and lower density make this ward more resilient.",
    },
    {
      id: "heartlake",
      name: "Heart Lake W.",
      score: 70,
      clinicAccess: 71,
      airQuality: 70,
      populationDensity: 51,
      housingDensity: 48,
      chronicDisease: 43,
      seniors: 41,
      sensorAQI: 42,
      temperature: 24,
      noise: 45,
      erHours: 112,
      shape: "M205 55 L325 35 L300 105 L335 185 L225 205 L175 125 Z",
      summary: "Stable but needs monitoring during a Condition X surge.",
    },
    {
      id: "vales",
      name: "Vales N.",
      score: 74,
      clinicAccess: 75,
      airQuality: 72,
      populationDensity: 47,
      housingDensity: 46,
      chronicDisease: 42,
      seniors: 39,
      sensorAQI: 38,
      temperature: 24,
      noise: 48,
      erHours: 118,
      shape: "M460 60 L575 90 L560 205 L475 150 Z",
      summary: "Generally resilient with good access and moderate density.",
    },
    {
      id: "sandringham",
      name: "Sandringham",
      score: 58,
      clinicAccess: 56,
      airQuality: 60,
      populationDensity: 63,
      housingDensity: 64,
      chronicDisease: 52,
      seniors: 43,
      sensorAQI: 57,
      temperature: 26,
      noise: 55,
      erHours: 92,
      shape: "M350 165 L475 150 L555 210 L520 325 L390 310 L335 185 Z",
      summary: "Moderate risk because density and access pressure increase under surge.",
    },
    {
      id: "brampton-n",
      name: "Brampton N.",
      score: 52,
      clinicAccess: 49,
      airQuality: 55,
      populationDensity: 68,
      housingDensity: 70,
      chronicDisease: 56,
      seniors: 45,
      sensorAQI: 61,
      temperature: 27,
      noise: 58,
      erHours: 83,
      shape: "M225 205 L335 185 L390 310 L300 380 L185 325 Z",
      summary: "At risk because of rising density and lower clinic access.",
    },
    {
      id: "brampton-e",
      name: "Brampton E.",
      score: 55,
      clinicAccess: 53,
      airQuality: 52,
      populationDensity: 66,
      housingDensity: 68,
      chronicDisease: 55,
      seniors: 47,
      sensorAQI: 63,
      temperature: 27,
      noise: 60,
      erHours: 86,
      shape: "M520 325 L555 210 L640 255 L625 390 L520 430 Z",
      summary: "At risk due to air quality and moderate healthcare access limitations.",
    },
    {
      id: "fletchers",
      name: "Fletchers Ck.",
      score: 38,
      clinicAccess: 41,
      airQuality: 44,
      populationDensity: 78,
      housingDensity: 75,
      chronicDisease: 69,
      seniors: 52,
      sensorAQI: 72,
      temperature: 28,
      noise: 67,
      erHours: 66,
      shape: "M185 325 L300 380 L285 520 L155 500 L105 390 Z",
      summary: "Critical risk from high density and chronic illness vulnerability.",
    },
    {
      id: "bramalea",
      name: "Bramalea",
      score: 31,
      clinicAccess: 33,
      airQuality: 39,
      populationDensity: 84,
      housingDensity: 80,
      chronicDisease: 76,
      seniors: 58,
      sensorAQI: 78,
      temperature: 29,
      noise: 71,
      erHours: 54,
      shape: "M390 310 L520 325 L520 430 L420 535 L285 520 L300 380 Z",
      summary: "Critical because multiple stressors combine during Condition X.",
    },
    {
      id: "downtown",
      name: "Downtown",
      score: 29,
      clinicAccess: 34,
      airQuality: 36,
      populationDensity: 91,
      housingDensity: 88,
      chronicDisease: 75,
      seniors: 55,
      sensorAQI: 80,
      temperature: 30,
      noise: 76,
      erHours: 48,
      shape: "M285 520 L420 535 L400 660 L250 650 L155 500 Z",
      summary: "Very high density creates fast pressure on local care systems.",
    },
    {
      id: "rosedale",
      name: "Rosedale",
      score: 24,
      clinicAccess: 28,
      airQuality: 32,
      populationDensity: 87,
      housingDensity: 90,
      chronicDisease: 81,
      seniors: 61,
      sensorAQI: 84,
      temperature: 31,
      noise: 74,
      erHours: 42,
      shape: "M420 535 L520 430 L625 390 L650 545 L560 675 L400 660 Z",
      summary: "Lowest resilience score; needs early mobile care deployment.",
    },
  ];
  
  export function clamp(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }
  
  export function getStatus(score) {
    if (score >= 70) {
      return {
        label: "Resilient",
        fill: "#b7e4c7",
        stroke: "#52b788",
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        border: "border-emerald-200",
      };
    }
  
    if (score >= 40) {
      return {
        label: "At Risk",
        fill: "#ffe8a3",
        stroke: "#e9b949",
        bg: "bg-amber-50",
        text: "text-amber-800",
        border: "border-amber-200",
      };
    }
  
    return {
      label: "Critical",
      fill: "#ffc9c9",
      stroke: "#e03131",
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-200",
    };
  }
  
  export function computeSurgeWard(ward, surge) {
    if (!surge) return ward;
  
    const pressure =
      ward.populationDensity * 0.24 +
      ward.housingDensity * 0.22 +
      ward.chronicDisease * 0.2 +
      ward.seniors * 0.14 +
      ward.sensorAQI * 0.2;
  
    const drop = pressure / 4.5;
  
    return {
      ...ward,
      score: clamp(ward.score - drop),
      sensorAQI: clamp(ward.sensorAQI + 13),
      temperature: ward.temperature + 2,
      noise: clamp(ward.noise + 9),
      erHours: Math.max(18, Math.round(ward.erHours - drop * 2.4)),
    };
  }