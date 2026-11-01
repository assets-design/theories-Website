import { SERVICES_STAGES } from "./data";
import { ServicesStageBento } from "./ServicesStageBento";

export function ServicesCatalog() {
  return (
    <div>
      {SERVICES_STAGES.map((stage, index) => (
        <ServicesStageBento key={stage.id} stage={stage} index={index} />
      ))}
    </div>
  );
}
