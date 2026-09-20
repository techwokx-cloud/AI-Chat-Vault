import { ConversationList } from "@/components/dashboard/ConversationList";
import { ConversationViewer } from "@/components/dashboard/ConversationViewer";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatCards } from "@/components/dashboard/StatCards";
import { UploadBanner } from "@/components/dashboard/UploadBanner";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <UploadBanner />

      <StatCards />

      <section
        aria-label="Conversation workspace"
        className="grid items-start gap-6 xl:grid-cols-12"
      >
        <div className="min-w-0 xl:col-span-5">
          <ConversationList />
        </div>

        <div className="min-w-0 xl:col-span-7">
          <ConversationViewer />
        </div>
      </section>

      <QuickActions />
    </div>
  );
}
