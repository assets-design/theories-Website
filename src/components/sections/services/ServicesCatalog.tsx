import { SERVICES_STAGES } from "./data";
import { ServicesStageBlock } from "./ServicesStageBlock";

export function ServicesCatalog() {
  return (
    <div className="relative border-t border-white/15">
      {SERVICES_STAGES.map((stage) => (
        <div key={stage.id} className="relative border-b border-white/15 last:border-b-0">
          <ServicesStageBlock stage={stage} />
        </div>
      ))}
    </div>
  );
}
