'use client';

import WorkingHours from '@/components/page/rules/WorkingHours';
import SpamRules from '@/components/page/rules/SpamRules';
import TimeoutRules from '@/components/page/rules/TimeoutRules';
import BotControl from '@/components/page/rules/BotControl';

export default function BotRulesPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-2xl font-bold">
        ⚙️ Bot Rules
      </h2>

      <BotControl />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WorkingHours />
        <SpamRules />
      </div>

      <TimeoutRules />
    </div>
  );
}
