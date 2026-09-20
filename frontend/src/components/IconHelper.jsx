import { 
  FiCode, 
  FiSmartphone, 
  FiCloud, 
  FiCpu, 
  FiShield, 
  FiLayout, 
  FiShoppingCart, 
  FiTrello, 
  FiActivity, 
  FiBookOpen, 
  FiCreditCard, 
  FiTruck,
  FiBox
} from 'react-icons/fi';

export const serviceIconMap = {
  web: FiCode,
  mobile: FiSmartphone,
  cloud: FiCloud,
  ai: FiCpu,
  security: FiShield,
  design: FiLayout,
};

export const projectIconMap = {
  cart: FiShoppingCart,
  kanban: FiTrello,
  health: FiActivity,
  edu: FiBookOpen,
  fintech: FiCreditCard,
  delivery: FiTruck,
};

export function getServiceIcon(iconKey, props = { size: 24 }) {
  const IconComponent = serviceIconMap[iconKey] || FiBox;
  return <IconComponent {...props} />;
}

export function getProjectIcon(iconKey, props = { size: 24 }) {
  const IconComponent = projectIconMap[iconKey] || FiBox;
  return <IconComponent {...props} />;
}

