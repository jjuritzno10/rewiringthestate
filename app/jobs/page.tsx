import { ROLES } from "@/lib/roles";
import { JobsBoard } from "./JobsBoard";

export const metadata = {
  title: "Open roles · Rewiring the State",
};

export default function JobsPage() {
  return <JobsBoard roles={ROLES} />;
}
