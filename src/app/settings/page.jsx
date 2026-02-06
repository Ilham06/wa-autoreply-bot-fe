'use client';

import ProfileSettings from '@/components/page/settings/ProfileSetting';
import CreditSettings from '@/components/page/settings/CreditSetting';
import LanguageSettings from '@/components/page/settings/LanguageSetting';
import DangerZone from '@/components/page/settings/DangerZone';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold">
        🛠️ Settings
      </h2>

      <ProfileSettings />
      <CreditSettings />
      <LanguageSettings />
      <DangerZone />
    </div>
  );
}
