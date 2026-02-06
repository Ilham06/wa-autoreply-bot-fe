'use client';

import AISettings from "@/components/page/ai/AISetting";
import AIToggle from "@/components/page/ai/AIToggle";
import PromptEditor from "@/components/page/ai/PromptEditor";
import SourceEditor from "@/components/page/ai/SourceEditor";

export default function AIConfigPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-2xl font-bold">
        🤖 AI Configuration
      </h2>

      <AIToggle />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PromptEditor />
        <SourceEditor />
      </div>

      <AISettings />
    </div>
  );
}
