import PageLoader from "@/components/global/login/pageLoader";
import { Card } from "@/components/ui/card";

export default function MainContent() {
  return (
    <Card>
      <PageLoader fullPage={false} />
    </Card>
  );
}